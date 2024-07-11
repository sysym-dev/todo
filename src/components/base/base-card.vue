<script setup>
defineProps({
  title: String,
});
</script>

<template>
  <div class="bg-white p-5 rounded-lg space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="font-bold text-xl text-gray-900">{{ title }}</h2>
      <slot name="action" />
    </div>
    <slot />
  </div>
</template>
