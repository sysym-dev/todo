<script setup>
import BaseHeading from 'src/components/base/base-heading.vue';
import TodoList from 'src/features/todo/components/todo-list.vue';
</script>

<template>
  <base-heading title="Upcoming Todo" size="text-2xl" />
  <todo-list :with-percentage="false" :filter="{ upcoming: true }" />
</template>
