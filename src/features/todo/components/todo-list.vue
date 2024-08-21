<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import TodoListItem from 'src/features/todo/components/todo-list-item.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import { useValidation } from 'src/cores/validation';
import { z } from 'zod';
import { useTodoStore } from 'src/features/todo/todo.store';

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

const percentage = computed(() => {
  const total = todoStore.todos.length;
  const done = todoStore.todos.filter((todo) => todo.done).length;

  return {
    total,
    done,
    percentage: Math.round((done / total) * 100),
  };
});

async function onSubmitNewTodo() {
  const res = await validate(newTodo);

  if (!res.error) {
    todoStore.create({
      name: newTodo.name,
    });

    newTodo.name = '';
  }
}
function onDeleteTodo(id) {
  todoStore.remove(id);
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
  newTodoInput,
});
</script>

<template>
  <div v-if="todoStore.todos.length" class="space-y-1">
    <div class="h-2 bg-gray-100">
      <div
        class="h-full bg-blue-600"
        :style="{ width: `${percentage.percentage}%` }"
      ></div>
    </div>
    <div class="flex items-center justify-between">
      <span class="block text-xs text-gray-500"
        >{{ percentage.done }}/{{ percentage.total }}</span
      >
      <span class="block text-xs text-gray-500"
        >{{ percentage.percentage }}%</span
      >
    </div>
  </div>
  <ul class="space-y-2">
    <todo-list-item
      v-for="(todo, index) in todoStore.todos"
      :key="todo.id"
      v-model="todoStore.todos[index]"
      @delete="onDeleteTodo(todo.id)"
    />
  </ul>
  <form @submit.prevent="onSubmitNewTodo">
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
