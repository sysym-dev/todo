<script setup>
const visible = defineModel();
</script>

<template>
  <div
    v-if="visible"
    class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-start py-16"
  >
    <div class="max-w-md w-full">
      <slot />
    </div>
  </div>
</template>
