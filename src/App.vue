<script setup>
import { reactive, ref } from 'vue';
import TodoListItem from './features/todo/components/todo-list-item.vue';

const newTodo = reactive({
  name: '',
});
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
]);

function onSubmitNewTodo() {
  todos.value.push({
    id: todos.value.length + 1,
    name: newTodo.name,
    done: false,
  });

  newTodo.name = '';
}
function onDeleteTodo(index) {
  todos.value.splice(index, 1);
}
</script>

<template>
  <main class="bg-white max-w-sm w-full mx-auto mt-20 space-y-4">
    <h1 class="font-bold text-2xl text-gray-900">Today Todo</h1>
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
        type="text"
        class="w-full"
        placeholder="Input New Todo"
        autofocus
        v-model="newTodo.name"
      />
    </form>
  </main>
</template>
