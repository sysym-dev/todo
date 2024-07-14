<script setup>
import { ref } from 'vue';

defineProps({
  padless: Boolean,
});

const visible = ref(false);

function onToggle() {
  visible.value = !visible.value;
}
function onClose() {
  visible.value = false;
}
</script>

<template>
  <div class="relative" v-click-outside="onClose">
    <slot name="toggle" :toggle="onToggle" />
    <transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="visible"
        :class="[
          'absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg',
          padless ? '' : 'py-1',
        ]"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>
