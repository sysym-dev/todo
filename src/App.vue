<script setup>
import { onMounted, reactive, ref } from 'vue';
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
  { id: 14, name: 'Pick up laundry', done: true },
  { id: 15, name: 'Write blog post', done: false },
  { id: 16, name: 'Research new software tools', done: true },
  { id: 17, name: 'Plan weekly meals', done: false },
  { id: 18, name: 'Check bank statement', done: true },
  { id: 19, name: 'Update resume', done: false },
  { id: 20, name: 'Attend workshop', done: true },
  { id: 21, name: 'Clean the kitchen', done: false },
  { id: 22, name: 'Backup important files', done: true },
  { id: 23, name: 'Refuel the car', done: false },
  { id: 24, name: 'Pay utility bills', done: true },
  { id: 25, name: 'Book flight tickets', done: false },
  { id: 26, name: 'Review code changes', done: true },
  { id: 27, name: 'Prepare for meeting with client', done: false },
  { id: 28, name: 'Buy a birthday gift', done: true },
  { id: 29, name: 'Organize photo album', done: false },
  { id: 30, name: 'Cook dinner', done: true },
  { id: 31, name: 'Update project plan', done: false },
  { id: 32, name: 'Finish online course', done: true },
  { id: 33, name: 'Clean the car', done: false },
  { id: 34, name: 'Set up new software', done: true },
  { id: 35, name: 'Write thank you notes', done: false },
  { id: 36, name: 'Read industry news', done: true },
  { id: 37, name: 'Declutter the garage', done: false },
  { id: 38, name: 'Prepare budget report', done: true },
  { id: 39, name: 'Repair broken chair', done: false },
  { id: 40, name: 'Walk the dog', done: true },
  { id: 41, name: 'Paint the living room', done: false },
  { id: 42, name: 'Respond to social media messages', done: true },
  { id: 43, name: 'Write code documentation', done: false },
  { id: 44, name: 'Create a new playlist', done: true },
  { id: 45, name: 'Check email inbox', done: false },
  { id: 46, name: 'Attend family gathering', done: true },
  { id: 47, name: 'Sort through old clothes', done: false },
  { id: 48, name: 'Update blog layout', done: true },
  { id: 49, name: 'Call the bank', done: false },
  { id: 50, name: "Make doctor's follow-up appointment", done: true },
]);

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
  <main class="bg-white max-w-sm w-full mx-auto my-20 space-y-4">
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
