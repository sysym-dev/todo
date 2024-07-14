<script setup>
import { computed } from 'vue';

const props = defineProps({
  id: String,
  label: String,
  color: {
    type: String,
    default: 'default',
  },
  size: {
    type: String,
    default: 'md',
  },
  message: String,
});

const color = computed(() => {
  return {
    default: 'text-gray-900',
    red: 'text-red-600',
  }[props.color];
});
const size = computed(() => {
  return {
    md: 'text-base',
    sm: 'text-sm',
  }[props.size];
});
</script>
<template>
  <div :class="[props.size === 'sm' ? 'space-y-1' : 'space-y-2']">
    <label :for="id" :class="[color, size]">{{ label }}</label>
    <slot />
    <p v-if="message" class="text-red-600">{{ message }}</p>
  </div>
</template>
