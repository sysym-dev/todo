<script setup>
import { computed } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: 'red',
  },
});

const color = computed(() => {
  return {
    red: 'bg-red-50 text-red-600 border-red-300',
    gray: 'bg-gray-50 text-gray-600 border-gray-300',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-400',
  }[props.color];
});
</script>

<template>
  <div :class="['flex items-center h-10 px-3 rounded-lg border', color]">
    <slot />
  </div>
</template>
