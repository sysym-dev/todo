<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import { Plus as NewTodoIcon } from '@vicons/tabler';
import TodoListItem from './features/todo/components/todo-list-item.vue';

const newTodo = reactive({
  name: '',
});
const inputNewTodo = ref();

const todos = ref([
  { id: 1, name: 'Buy groceries', done: false },
  { id: 2, name: 'Complete project report', done: true },
  { id: 3, name: 'Schedule doctor appointment', done: false },
  { id: 4, name: 'Finish reading book', done: true },
  { id: 5, name: 'Plan weekend trip', done: false },
  { id: 6, name: 'Attend team meeting', done: true },
  { id: 7, name: 'Fix bug in code', done: false },
  { id: 8, name: 'Call plumber', done: true },
  { id: 9, name: 'Organize desk', done: false },
  { id: 10, name: 'Send email to client', done: true },
  { id: 11, name: 'Exercise for 30 minutes', done: false },
  { id: 12, name: 'Prepare presentation', done: true },
  { id: 13, name: 'Water the plants', done: false },
]);
const presentage = computed(() => {
  const total = todos.value.length;
  const done = todos.value.filter((todo) => todo.done).length;

  return {
    total,
    done,
    presentage: Math.round((done / total) * 100),
  };
});

function onSubmitNewTodo() {
  todos.value.push({
    id: todos.value.length + 1,
    name: newTodo.name,
    done: false,
  });

  newTodo.name = '';
}
function onClickNewTodo() {
  inputNewTodo.value.focus();
}
function onDeleteTodo(index) {
  todos.value.splice(index, 1);
}

onMounted(() => {
  if (
    document.documentElement.scrollHeight <=
    document.documentElement.clientHeight
  ) {
    inputNewTodo.value.focus();
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
    <div class="space-y-1">
      <div class="h-2 bg-gray-100">
        <div
          class="h-full bg-blue-600"
          :style="{ width: `${presentage.presentage}%` }"
        ></div>
      </div>
      <div class="flex items-center justify-between">
        <span class="block text-xs text-gray-500"
          >{{ presentage.done }}/{{ presentage.total }}</span
        >
        <span class="block text-xs text-gray-500"
          >{{ presentage.presentage }}%</span
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
      <input
        ref="inputNewTodo"
        type="text"
        class="w-full"
        placeholder="Input New Todo"
        v-model="newTodo.name"
      />
    </form>
  </main>
</template>
