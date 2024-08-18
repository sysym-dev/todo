<script setup>
import { Dots as OptionIcon } from '@vicons/tabler';
import { reactive, ref } from 'vue';

const newTask = reactive({
  name: '',
});
const tasks = ref([
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

function onSubmitNewTask() {
  tasks.value.push({
    id: tasks.value.length + 1,
    name: newTask.name,
    done: false,
  });

  newTask.name = '';
}
</script>

<template>
  <main class="bg-white max-w-sm w-full mx-auto mt-20 space-y-4">
    <h1 class="font-bold text-2xl text-gray-900">Today Task</h1>
    <ul class="space-y-2">
      <li
        v-for="(task, index) in tasks"
        :key="task.id"
        class="group flex items-center gap-x-2"
      >
        <input
          type="checkbox"
          :id="`task-${task.id}`"
          v-model="tasks[index].done"
        />
        <label
          :for="`task-${task.id}`"
          :class="['text-gray-900', task.done ? 'line-through' : '']"
          >{{ task.name }}</label
        >
        <button class="hidden group-hover:block">
          <option-icon class="w-4 h-4" />
        </button>
      </li>
    </ul>
    <form @submit.prevent="onSubmitNewTask">
      <input
        type="text"
        class="w-full"
        placeholder="Input New Task"
        autofocus
        v-model="newTask.name"
      />
    </form>
  </main>
</template>
