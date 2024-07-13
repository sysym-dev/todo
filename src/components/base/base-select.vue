<script setup>
import { computed } from 'vue';

const props = defineProps({
  id: String,
  options: Array,
  color: {
    type: String,
    default: 'default',
  },
});

const selected = defineModel();

const color = computed(() => {
  return {
    default:
      'border-gray-200 placeholder-gray-300 hover:border-gray-300 text-gray-900 focus:border-blue-600',
    red: 'border-red-400 bg-red-50 placeholder-red-400 hover:border-red-500 text-red-600 focus:border-red-600',
  }[props.color];
});
</script>

<template>
  <select
    :name="id"
    :id="id"
    :class="['block w-full border rounded-lg h-10 focus:outline-0', color]"
    v-model="selected"
  >
    <option v-for="option in options" :key="option.id" :value="option.id">
      {{ option.name }}
    </option>
  </select>
</template>
