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
  loadingBlock: Boolean,
});
const emit = defineEmits(['click']);

const size = computed(() => {
  return {
    md: 'text-base px-4 h-10 rounded-lg gap-x-2',
    sm: 'text-sm px-2.5 h-7 rounded-md gap-x-1',
    square: 'px-1 py-1 rounded-lg',
    'square-lg': 'h-8 w-8 rounded-lg',
  }[props.size];
});
const color = computed(() => {
  return {
    blue: 'bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-400 disabled:bg-blue-400',
    red: 'bg-red-600 text-white hover:bg-red-500 active:bg-red-400 disabled:bg-red-400',
    green:
      'bg-green-600 text-white hover:bg-green-500 active:bg-green-400 disabled:bg-green-400',
    transparent: 'text-gray-600 hover:bg-gray-100 active:bg-gray-50',
    'transparent-bordered':
      'text-gray-600 hover:bg-gray-100 active:bg-gray-50 border border-gray-200',
    'white-borderless':
      'bg-white text-gray-600 hover:bg-gray-50 active:bg-gray-50 border border-white hover:border-gray-50',
    'transparent-red': 'text-red-600 hover:bg-red-100 active:bg-red-50',
    'transparent-blue': 'text-blue-600 hover:bg-blue-100 active:bg-blue-50',
  }[props.color];
});
const spinnerColor = computed(() => {
  return (
    {
      blue: 'blue-light',
      red: 'red-light',
    }[props.color] ?? 'blue'
  );
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
      'inline-flex items-center justify-center font-bold relative',
      size,
      color,
      fullwidth ? 'w-full' : '',
    ]"
    :disabled="loading"
    :title="title"
    @click="onClick"
  >
    <base-spinner :color="spinnerColor" v-if="loading" />
    <slot v-if="!loading || !loadingBlock" />
    <div class="absolute -top-2 -right-2">
      <slot name="badge-top" />
    </div>
  </component>
</template>
