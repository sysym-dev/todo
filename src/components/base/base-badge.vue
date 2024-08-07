<script setup>
import { computed } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: 'light',
  },
  size: {
    type: String,
    default: 'md',
  },
});

const color = computed(() => {
  return {
    red: 'bg-red-100 text-red-600',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-900',
    light: 'bg-gray-100 text-gray-600',
  }[props.color];
});
const size = computed(() => {
  return {
    md: 'px-1.5 py-0.5 rounded-md',
    sm: 'px-1 h-4 rounded-md',
    'circle-sm': 'w-5 h-5 rounded-full flex items-center justify-center',
  }[props.size];
});
</script>

<template>
  <div :class="['text-xs inline-block', color, size]">
    <slot />
  </div>
</template>
