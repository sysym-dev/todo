<script setup>
import { useTodoStore } from 'src/features/todo/todo.store';
import BaseHeading from 'src/components/base/base-heading.vue';
import { parseDate } from 'src/utils/date';

const todoStore = useTodoStore();

todoStore.load({
  filter: {
    done: true,
  },
});
</script>

<template>
  <base-heading title="Done Todo" size="text-2xl" />
  <p v-if="!todoStore.todos.length" class="text-gray-600">
    No done tasks found
  </p>
  <ul v-else class="space-y-2">
    <li
      v-for="todo in todoStore.todos"
      :key="todo.id"
      class="flex-col flex gap-1 sm:flex-row sm:gap-2"
    >
      <p class="text-gray-400 shrink-0 w-24">
        {{ todo.date ? parseDate(todo.date).format('YYYY/MM/DD') : 'No Date' }}
      </p>
      <p class="text-gray-900">{{ todo.name }}</p>
    </li>
  </ul>
</template>
