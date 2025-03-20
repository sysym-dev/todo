<script setup>
import 'v-calendar/style.css';
import { DatePicker } from 'v-calendar';
import { onMounted, reactive, ref, inject } from 'vue';
import { Calendar as CalendarIcon, Tag as TagIcon } from '@vicons/tabler';
import BaseInput from 'src/components/base/base-input.vue';
import BaseButtonIcon from 'src/components/base/base-button-icon.vue';
import { useValidation } from 'src/cores/validation';
import { z } from 'zod';
import { parseDate } from 'src/utils/date';
import { useAuthStore } from 'src/features/auth/auth.store';

const props = defineProps({
  withDate: Boolean,
  payload: Object,
});
const emit = defineEmits(['created']);

const supabase = inject('supabase');
const emitter = inject('emitter');
const authStore = useAuthStore();
const { validate, resetError } = useValidation(
  z.object({
    name: z
      .string({ required_error: 'Todo name cannot be empty' })
      .min(1, { message: 'Todo name cannot be empty' }),
    date: z
      .string({
        required_error: 'Todo date is required',
        invalid_type_error: 'Todo date must be a date',
      })
      .datetime()
      .nullable()
      .optional(),
  }),
);

const newTodo = reactive({
  name: '',
  date: null,
});
const newTodoInput = ref();
const visibleAction = ref(false);

async function onSubmitNewTodo() {
  const validation = await validate({
    name: newTodo.name,
    date: newTodo.date ? newTodo.date.toISOString() : null,
    ...props.payload,
  });

  if (!validation.error) {
    const res = await supabase.from('todos').insert({
      user_id: authStore.user.data.user.id,
      name: validation.data.name,
      date: validation.data.date
        ? parseDate(validation.data.date).format('YYYY-MM-DD')
        : null,
    });

    if (res.status !== 201) {
      emitter.emit('create-toast', {
        message: 'Failed to create todo',
      });
    } else {
      emit('created');

      newTodo.name = '';
      newTodo.date = null;
    }
  }
}
function onInputNewTodo() {
  resetError();
}
function onHideDate() {
  newTodoInput.value.input.focus();
}
function onChange() {
  newTodoInput.value.input.focus();
  resetError();
}
function onKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    onSubmitNewTodo();
    newTodoInput.value.input.style.height = '42px';
  }
}
function onOutFocus() {
  visibleAction.value = false;
  newTodo.date = null;
}

onMounted(() => {
  if (
    document.documentElement.scrollHeight <=
    document.documentElement.clientHeight
  ) {
    newTodoInput.value.input.focus();
  }
});

defineExpose({
  inputName: newTodoInput,
});
</script>

<template>
  <form @submit.prevent="onSubmitNewTodo">
    <div class="border border-gray-500" v-click-outside="onOutFocus">
      <base-input
        ref="newTodoInput"
        placeholder="Input New Todo"
        :classes="{
          input: 'border-0 focus:ring-0',
        }"
        v-model="newTodo.name"
        textarea
        @keypress="onKeydown"
        @input="onInputNewTodo"
        @focus="visibleAction = true"
      />
      <div v-if="visibleAction" class="px-3 pb-2 flex gap-2">
        <base-button-icon padless :icon="TagIcon" />
        <date-picker
          v-if="newTodo.date"
          v-slot="{ togglePopover }"
          :popover="{ placement: 'bottom-start' }"
          :min-date="parseDate().add(1, 'day').toDate()"
          v-model="newTodo.date"
          @popover-did-hide="onHideDate"
          @update:modelValue="onChange"
        >
          <button class="text-sm" @click="togglePopover">
            {{ parseDate(newTodo.date).format('DD MMM') }}
          </button>
        </date-picker>
        <date-picker
          v-else
          v-slot="{ togglePopover }"
          :popover="{ placement: 'bottom-start' }"
          :min-date="parseDate().add(1, 'day').toDate()"
          v-model="newTodo.date"
          @popover-did-hide="onHideDate"
          @update:modelValue="onChange"
        >
          <base-button-icon
            padless
            :icon="CalendarIcon"
            @click="togglePopover"
          />
        </date-picker>
      </div>
    </div>
  </form>
</template>
