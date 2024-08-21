<script setup>
import BaseHeading from 'src/components/base/base-heading.vue';
import TodoList from 'src/features/todo/components/todo-list.vue';
</script>

<template>
  <base-heading title="Late Todo" size="text-2xl" />
  <todo-list
    :with-new-todo="false"
    :with-percentage="false"
    with-empty-message
    :filter="{ late: true }"
  />
</template>
