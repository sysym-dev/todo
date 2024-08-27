<script setup>
import { ref, inject } from 'vue';
import { AlertTriangle as AlertIcon, X as CloseIcon } from '@vicons/tabler';

const emitter = inject('emitter');

const toasts = ref([]);

function onCreateToast(e) {
  const id = toasts.value.length + 1;

  toasts.value.push({
    id,
    message: e.message,
  });

  setTimeout(() => {
    const index = toasts.value.findIndex((toast) => toast.id === id);

    toasts.value.splice(index, 1);
  }, 1000);
}

emitter.on('create-toast', onCreateToast);
</script>

<template>
  <div class="fixed top-4 left-1/2 -translate-x-1/2 space-y-4">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="border border-red-600 bg-red-50 text-red-600 px-3 py-2 flex items-center justify-between min-w-[400px]"
    >
      <div class="flex items-center gap-x-2">
        <alert-icon class="w-4 h-4" />
        <p>{{ toast.message }}</p>
      </div>
      <button v-if="false">
        <close-icon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
