<script setup>
import { computed } from 'vue';
import BaseSpinner from './base-spinner.vue';

const props = defineProps({
  size: {
    type: String,
    default: 'md',
  },
  color: {
    type: String,
    default: 'blue',
  },
  type: {
    type: String,
    default: 'button',
  },
  loading: Boolean,
});
const emit = defineEmits(['click']);

const size = computed(() => {
  return {
    md: 'text-base px-4 h-10 rounded-lg',
    sm: 'text-sm px-2.5 h-7 rounded-md',
    square: 'px-1 py-1 rounded-lg',
  }[props.size];
});
const color = computed(() => {
  return {
    blue: 'bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-400 disabled:bg-blue-400',
    transparent: 'text-gray-600 hover:bg-gray-100 active:bg-gray-50',
  }[props.color];
});

function onClick() {
  emit('click');
}
</script>

<template>
  <button
    :type="type"
    :class="['inline-flex items-center font-bold gap-x-2', size, color]"
    :disabled="loading"
    @click="onClick"
  >
    <base-spinner color="blue-light" v-if="loading" />
    <slot />
  </button>
</template>
