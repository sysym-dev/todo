<script setup>
defineProps({
  id: String,
  label: String,
});
</script>
<template>
  <div class="space-y-2">
    <label :for="id" class="text-gray-900">{{ label }}</label>
    <slot />
  </div>
</template>
