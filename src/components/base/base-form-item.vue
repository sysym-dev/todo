<script setup>
defineProps({
  message: String,
});
</script>

<template>
  <div class="space-y-1">
    <slot />
    <p v-if="message" class="text-sm text-red-600">{{ message }}</p>
  </div>
</template>
