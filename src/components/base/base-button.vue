<script setup>
import { computed } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default: 'md',
  },
  color: {
    type: String,
    default: 'blue',
  },
});
const size = computed(() => {
  return {
    md: 'text-base px-4 h-10 rounded-lg',
    sm: 'text-sm px-2.5 h-7 rounded-md',
    square: 'px-1 py-1 rounded-lg',
  }[props.size];
});
const color = computed(() => {
  return {
    blue: 'bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-400',
    transparent: 'text-gray-600 hover:bg-gray-100 active:bg-gray-50',
  }[props.color];
});
</script>

<template>
  <button :class="['inline-flex items-center font-bold', size, color]">
    <slot />
  </button>
</template>
