<script setup>
import { computed } from 'vue';
import BaseSpinner from './base-spinner.vue';

const props = defineProps({
  tag: {
    type: String,
    default: 'button',
  },
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
  to: null,
  fullwidth: Boolean,
  title: String,
});
const emit = defineEmits(['click']);

const size = computed(() => {
  return {
    md: 'text-base px-4 h-10 rounded-lg gap-x-2',
    sm: 'text-sm px-2.5 h-7 rounded-md gap-x-1',
    'sm-square': 'text-sm w-7 h-7 rounded-md flex',
    square: 'px-1 py-1 rounded-lg',
  }[props.size];
});
const color = computed(() => {
  return {
    blue: 'bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-400 disabled:bg-blue-400',
    transparent: 'text-gray-600 hover:bg-gray-100 active:bg-gray-50',
    'transparent-bordered':
      'text-gray-600 hover:bg-gray-100 active:bg-gray-50 border border-gray-200',
    'transparent-red': 'text-red-600 hover:bg-red-100 active:bg-red-50',
  }[props.color];
});

function onClick() {
  emit('click');
}
</script>

<template>
  <component
    :to="to"
    :is="tag"
    :type="type"
    :class="[
      'inline-flex items-center justify-center font-bold',
      size,
      color,
      fullwidth ? 'w-full' : '',
    ]"
    :disabled="loading"
    :title="title"
    @click="onClick"
  >
    <base-spinner color="blue-light" v-if="loading" />
    <slot />
  </component>
</template>
