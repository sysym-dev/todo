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

defineProps({
  withDate: Boolean,
});

const todoStore = useTodoStore();
const { validate, error, resetError } = useValidation(
  z.object({
    name: z
      .string({ required_error: 'Todo name cannot be empty' })
      .min(1, { message: 'Todo name cannot be empty' }),
  }),
);

const newTodo = reactive({
  name: '',
});
const newTodoInput = ref();

async function onSubmitNewTodo() {
  const res = await validate(newTodo);

  if (!res.error) {
    todoStore.create({
      name: newTodo.name,
      date: parseDate().toDate(),
    });

    newTodo.name = '';
  }
}
function onInputNewTodo() {
  resetError();
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
    <base-form-item :message="error.name">
      <base-input
        ref="newTodoInput"
        placeholder="Input New Todo"
        :state="error.name ? 'error' : 'default'"
        v-model="newTodo.name"
        @input="onInputNewTodo"
      >
        <template v-if="withDate" #append>
          <date-picker
            v-slot="{ togglePopover }"
            :popover="{ placement: 'bottom-end' }"
          >
            <button
              type="button"
              class="absolute top-0 right-0 h-full flex items-center px-3 text-gray-900"
              @click="togglePopover"
            >
              <calendar-icon class="w-4 h-4" />
            </button>
          </date-picker>
        </template>
      </base-input>
    </base-form-item>
  </form>
</template>
