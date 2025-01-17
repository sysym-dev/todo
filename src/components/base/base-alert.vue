<script setup>
import { AlertTriangle as AlertIcon, X as CloseIcon } from '@vicons/tabler';

defineProps({
  message: String,
});
</script>

<template>
  <div
    class="border border-red-600 bg-red-50 text-red-600 px-3 py-2 flex items-center justify-between min-w-[400px]"
  >
    <div class="flex items-center gap-x-2">
      <alert-icon class="w-4 h-4" />
      <p>{{ message }}</p>
    </div>
    <button v-if="false">
      <close-icon class="w-4 h-4" />
    </button>
  </div>
</template>
