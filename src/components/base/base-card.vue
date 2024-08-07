<script setup>
import BaseSpinner from 'src/components/base/base-spinner.vue';
import BaseAlert from 'src/components/base/base-alert.vue';
import { computed } from 'vue';

const props = defineProps({
  title: String,
  titleLoading: Boolean,
  withContent: {
    type: Boolean,
    default: true,
  },
  error: Boolean,
  errorMessage: String,
  errorBlock: {
    type: Boolean,
    default: true,
  },
  mobileActionCol: {
    type: Boolean,
    default: true,
  },
  shadow: {
    type: Boolean,
    default: true,
  },
});

const contentVisible = computed(
  () => props.withContent && (!props.error || !props.errorBlock),
);
</script>

<template>
  <div
    :class="[
      'bg-white rounded-lg',
      shadow ? 'shadow border border-gray-200' : '',
    ]"
  >
    <div class="p-5 space-y-4">
      <div
        :class="[
          'flex',
          mobileActionCol
            ? 'flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0'
            : 'items-center justify-between',
        ]"
      >
        <div class="flex items-center gap-x-2">
          <h2 class="font-bold text-xl text-gray-900">{{ title }}</h2>
          <base-spinner v-if="titleLoading" />
        </div>
        <slot name="action" />
      </div>
      <base-alert v-if="error">
        {{ errorMessage }}
      </base-alert>
      <slot v-if="contentVisible" />
    </div>
    <div
      v-if="$slots.footer && contentVisible"
      class="border-t border-gray-200 px-5 py-4"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
