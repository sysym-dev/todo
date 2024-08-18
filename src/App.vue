<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import { Plus as NewTodoIcon } from '@vicons/tabler';
import TodoListItem from 'src/features/todo/components/todo-list-item.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import { useValidation } from 'src/cores/validation';
import { z } from 'zod';

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

const todos = ref([]);
const percentage = computed(() => {
  const total = todos.value.length;
  const done = todos.value.filter((todo) => todo.done).length;

  return {
    total,
    done,
    percentage: Math.round((done / total) * 100),
  };
});

async function onSubmitNewTodo() {
  const res = await validate(newTodo);

  if (!res.error) {
    todos.value.push({
      id: todos.value.length + 1,
      name: res.data.name,
      done: false,
    });

    newTodo.name = '';
  }
}
function onClickNewTodo() {
  newTodoInput.value.input.focus();
}
function onDeleteTodo(index) {
  todos.value.splice(index, 1);
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
</script>

<template>
  <main
    class="bg-white max-w-sm w-full mx-auto my-4 space-y-4 px-4 sm:my-20 md:px-0"
  >
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-2xl text-gray-900">Today Todo</h1>
      <button
        class="flex items-center gap-x-1 text-blue-600 text-sm"
        @click="onClickNewTodo"
      >
        <new-todo-icon class="w-3 h-3" />
        <span>New Todo</span>
      </button>
    </div>
    <div v-if="todos.length" class="space-y-1">
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
        v-for="(todo, index) in todos"
        :key="todo.id"
        v-model="todos[index]"
        @delete="onDeleteTodo(index)"
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
  </main>
</template>
