<script setup>
import BaseSpinner from './base-spinner.vue';

defineProps({
  fullwidth: Boolean,
  loading: Boolean,
  disabled: Boolean,
});
</script>

<template>
  <button
    :disabled="disabled"
    :class="[
      'min-h-[42px] px-3 bg-blue-600 text-white flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-blue-700',
      fullwidth ? 'w-full' : '',
    ]"
  >
    <template v-if="loading">
      <base-spinner />
      Loading
    </template>
    <slot v-else />
  </button>
</template>
