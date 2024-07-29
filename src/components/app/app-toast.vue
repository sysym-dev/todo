<script setup>
import BaseAlert from 'src/components/base/base-alert.vue';
import { ref, inject } from 'vue';

const emitter = inject('emitter');
const toasts = ref([]);

emitter.on('create-toast', (payload) => {
  const id = toasts.value.length + 1;

  toasts.value.push({
    id,
    message: payload.message,
  });

  setTimeout(() => {
    const index = toasts.value.findIndex((toast) => toast.id === id);

    toasts.value.splice(index, 1);
  }, 1000);
});
</script>

<template>
  <div class="fixed left-1/2 -translate-x-1/2 top-4">
    <base-alert v-for="toast in toasts" :key="toast.id">{{
      toast.message
    }}</base-alert>
  </div>
</template>
