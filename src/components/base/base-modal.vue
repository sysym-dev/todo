<script setup>
import { watch, computed } from 'vue';

const props = defineProps({
  width: {
    type: String,
    default: 'md',
  },
});

const emit = defineEmits(['opened']);

const visible = defineModel();

const width = computed(() => {
  return {
    md: 'max-w-md',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
  }[props.width];
});

function onClickOutside() {
  visible.value = false;
}
function onKeyDown(e) {
  if (e.key === 'Escape') {
    visible.value = false;
  }
}

watch(visible, (value) => {
  if (value) {
    document.body.classList.add('overflow-hidden');
    document.addEventListener('keydown', onKeyDown);
    emit('opened');
  } else {
    document.body.classList.remove('overflow-hidden');
    document.removeEventListener('keydown', onKeyDown);
  }
});
</script>

<template>
  <div
    v-if="visible"
    class="fixed z-10 top-0 left-0 w-full h-screen overflow-y-auto bg-gray-400 bg-opacity-50 flex justify-center items-start py-16"
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
      <div :class="['w-full', width]" v-click-outside="onClickOutside">
        <slot />
      </div>
    </transition>
  </div>
</template>
