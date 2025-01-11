<script setup>
import { watch } from 'vue';

const visible = defineModel();

function onClose() {
  visible.value = false;
}

function onCloseEscape(e) {
  if (e.key === 'Escape') {
    visible.value = false;
  }
}

watch(visible, (value) => {
  if (value) {
    document.addEventListener('keydown', onCloseEscape);
  } else {
    document.removeEventListener('keydown', onCloseEscape);
  }
});
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center px-4 md:px-0 z-10"
  >
    <transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
      appear
    >
      <div
        class="relative bg-white p-6 max-w-screen-sm w-full mx-auto rounded-lg"
        v-click-outside="onClose"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>
