<script setup>
import 'v-calendar/style.css';
import { DatePicker } from 'v-calendar';
import { onMounted, reactive, ref } from 'vue';
import { Calendar as CalendarIcon } from '@vicons/tabler';
import BaseInput from 'src/components/base/base-input.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import { useValidation } from 'src/cores/validation';
import { z } from 'zod';
import { useTodoStore } from 'src/features/todo/todo.store';
import { parseDate } from 'src/utils/date';

const props = defineProps({
  withDate: Boolean,
  payload: Object,
});

const todoStore = useTodoStore();
const { validate, error, resetError } = useValidation(
  z.object({
    name: z
      .string({ required_error: 'Todo name cannot be empty' })
      .min(1, { message: 'Todo name cannot be empty' }),
    date: z
      .string({
        required_error: 'Todo date is required',
        invalid_type_error: 'Todo date must be a date',
      })
      .datetime(),
  }),
);

const newTodo = reactive({
  name: '',
  date: null,
});
const newTodoInput = ref();

async function onSubmitNewTodo() {
  const res = await validate({
    name: newTodo.name,
    date: newTodo.date ? newTodo.date.toISOString() : null,
    ...props.payload,
  });

  if (!res.error) {
    todoStore.create({
      name: res.data.name,
      date: parseDate(res.data.date).toDate(),
    });

    newTodo.name = '';
    newTodo.date = null;
  }
}
function onInputNewTodo() {
  resetError();
}
function onHideDate() {
  newTodoInput.value.input.focus();
}
function onChange() {
  resetError();
}
function onKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    onSubmitNewTodo();
    newTodoInput.value.input.style.height = '42px';
  }
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
    <base-form-item :message="error.name || error.date">
      <base-input
        ref="newTodoInput"
        placeholder="Input New Todo"
        :state="error.name || error.date ? 'error' : 'default'"
        :classes="{ input: withDate ? 'pr-8' : '' }"
        v-model="newTodo.name"
        textarea
        @keypress="onKeydown"
        @input="onInputNewTodo"
      >
        <template v-if="withDate" #append>
          <date-picker
            v-slot="{ togglePopover }"
            :popover="{ placement: 'bottom-end' }"
            :min-date="parseDate().add(1, 'day').toDate()"
            v-model="newTodo.date"
            @popover-did-hide="onHideDate"
            @update:modelValue="onChange"
          >
            <div
              class="absolute top-0 right-0 h-[42px] flex items-center pl-3 pr-2"
            >
              <button
                v-if="newTodo.date"
                type="button"
                class="text-gray-500 px-1"
                @click="togglePopover"
              >
                {{ parseDate(newTodo.date).format('DD MMM') }}
              </button>
              <button
                v-else
                type="button"
                class="w-6 h-6 text-gray-900 flex items-center justify-center"
                @click="togglePopover"
              >
                <calendar-icon class="w-4 h-4" />
              </button>
            </div>
          </date-picker>
        </template>
      </base-input>
    </base-form-item>
  </form>
</template>
