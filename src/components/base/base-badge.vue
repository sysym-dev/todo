<script setup>
import { computed } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: 'light',
  },
});

const color = computed(() => {
  return {
    red: 'bg-red-100 text-red-600',
    green: 'bg-green-100 text-green-600',
  }[props.color];
});
</script>

<template>
  <div :class="['text-xs px-1.5 py-0.5 rounded-md inline-block', color]">
    <slot />
  </div>
</template>
