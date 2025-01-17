<script setup>
import AppToast from 'src/components/app/app-toast.vue';
</script>

<template>
  <app-toast />
  <div class="h-screen flex items-center justify-center py-24">
    <div class="max-w-screen-sm mx-auto w-full px-4 md:px-0">
      <slot />
    </div>
  </div>
</template>
