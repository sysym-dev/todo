<script setup>
import { watch } from 'vue';

const emit = defineEmits(['opened']);
const visible = defineModel();

function onClickOutside() {
  visible.value = false;
}

watch(visible, (value) => {
  if (value) {
    emit('opened');
  }
});
</script>

<template>
  <div
    v-if="visible"
    class="fixed top-0 left-0 right-0 bottom-0 bg-gray-400 bg-opacity-50 flex justify-center items-start py-16"
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
      <div class="max-w-md w-full" v-click-outside="onClickOutside">
        <slot />
      </div>
    </transition>
  </div>
</template>
