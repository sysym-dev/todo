<script setup>
import { ref, inject } from 'vue';
import BaseAlert from 'src/components/base/base-alert.vue';

defineProps({
  position: {
    type: String,
    default: 'top-center',
  },
});

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
  <div
    :class="[
      'fixed space-y-4 z-20',
      position === 'top-center'
        ? 'top-4 left-1/2 -translate-x-1/2'
        : 'bottom-4 left-1/2 -translate-x-1/2',
    ]"
  >
    <base-alert
      v-for="toast in toasts"
      :key="toast.id"
      :message="toast.message"
    />
  </div>
</template>
