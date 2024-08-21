<script setup>
defineProps({
  size: {
    type: String,
    default: 'text-xl',
  },
  title: String,
});
</script>

<template>
  <div class="flex items-center justify-between">
    <h1 :class="['font-bold text-gray-900', size]">{{ title }}</h1>
    <slot name="action" />
  </div>
</template>
