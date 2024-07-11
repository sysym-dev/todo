<script setup>
const visible = defineModel();

function onClickOutside() {
  visible.value = false;
}
</script>

<template>
  <div
    v-if="visible"
    class="fixed top-0 left-0 right-0 bottom-0 bg-gray-400 bg-opacity-50 flex justify-center items-start py-16"
  >
    <div class="max-w-md w-full" v-click-outside="onClickOutside">
      <slot />
    </div>
  </div>
</template>
