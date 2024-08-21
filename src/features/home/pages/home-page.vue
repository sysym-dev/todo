<script setup>
import { ref } from 'vue';
import { Plus as NewTodoIcon } from '@vicons/tabler';
import BaseHeading from 'src/components/base/base-heading.vue';
import TodoList from 'src/features/todo/components/todo-list.vue';

const todoListEl = ref();

function onClickNewTodo() {
  todoListEl.value.newTodoInput.input.focus();
}
</script>

<template>
  <base-heading title="Today Todo" size="text-2xl">
    <template #action>
      <button
        class="flex items-center gap-x-1 text-blue-600 text-sm"
        @click="onClickNewTodo"
      >
        <new-todo-icon class="w-3 h-3" />
        <span>New Todo</span>
      </button>
    </template>
  </base-heading>
  <todo-list ref="todoListEl" :filter="{ today: true }" />
</template>
