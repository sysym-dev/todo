<script setup>
import { onMounted, reactive, ref } from 'vue';
import TodoListItem from 'src/features/todo/components/todo-list-item.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import { useValidation } from 'src/cores/validation';
import { z } from 'zod';
import { useTodoStore } from 'src/features/todo/todo.store';
import { parseDate } from 'src/utils/date';

const props = defineProps({
  withNewTodo: {
    type: Boolean,
    default: true,
  },
  withPercentage: {
    type: Boolean,
    default: true,
  },
  withEmptyMessage: Boolean,
  withDiffDate: Boolean,
  filter: Object,
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
function onUpdated() {
  todoStore.load({ filter: props.filter });
}

onMounted(() => {
  if (
    props.withNewTodo &&
    document.documentElement.scrollHeight <=
      document.documentElement.clientHeight
  ) {
    newTodoInput.value.input.focus();
  }
});

defineExpose({
  newTodoInput,
});

todoStore.load({ filter: props.filter });
</script>

<template>
  <div v-if="withPercentage && todoStore.todos.length" class="space-y-1">
    <div class="h-2 bg-gray-100">
      <div
        class="h-full bg-blue-600"
        :style="{ width: `${todoStore.percentage.percentage}%` }"
      ></div>
    </div>
    <div class="flex items-center justify-between">
      <span class="block text-xs text-gray-500"
        >{{ todoStore.percentage.done }}/{{ todoStore.percentage.total }}</span
      >
      <span class="block text-xs text-gray-500"
        >{{ todoStore.percentage.percentage }}%</span
      >
    </div>
  </div>
  <p v-if="withEmptyMessage && !todoStore.todos.length" class="text-gray-600">
    All Done
  </p>
  <ul class="space-y-2">
    <todo-list-item
      v-for="(todo, index) in todoStore.todos"
      :key="index"
      :with-diff-date="withDiffDate"
      v-model="todoStore.todos[index]"
      @updated="onUpdated"
    />
  </ul>
  <form v-if="withNewTodo" @submit.prevent="onSubmitNewTodo">
    <base-form-item :message="error.name">
      <base-input
        ref="newTodoInput"
        placeholder="Input New Todo"
        :state="error.name ? 'error' : 'default'"
        v-model="newTodo.name"
        @input="onInputNewTodo"
      />
    </base-form-item>
  </form>
</template>
