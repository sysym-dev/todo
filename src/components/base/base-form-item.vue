<script setup>
import { computed } from 'vue';

const props = defineProps({
  id: String,
  label: String,
  color: {
    type: String,
    default: 'default',
  },
  message: String,
});

const color = computed(() => {
  return {
    default: 'text-gray-900',
    red: 'text-red-600',
  }[props.color];
});
</script>
<template>
  <div class="space-y-2">
    <label :for="id" :class="[color]">{{ label }}</label>
    <slot />
    <p v-if="message" class="text-red-600">{{ message }}</p>
  </div>
</template>
