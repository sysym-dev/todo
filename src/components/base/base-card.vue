<script setup>
import BaseSpinner from 'src/components/base/base-spinner.vue';
import BaseAlert from 'src/components/base/base-alert.vue';

defineProps({
  title: String,
  titleLoading: Boolean,
  withContent: {
    type: Boolean,
    default: true,
  },
  error: Boolean,
  errorMessage: String,
});
</script>

<template>
  <div class="bg-white p-5 rounded-lg space-y-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-x-2">
        <h2 class="font-bold text-xl text-gray-900">{{ title }}</h2>
        <base-spinner v-if="titleLoading" />
      </div>
      <slot name="action" />
    </div>
    <base-alert v-if="error">
      {{ errorMessage }}
    </base-alert>
    <slot v-else-if="withContent" />
  </div>
</template>
