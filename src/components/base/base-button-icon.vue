<script setup>
defineProps({
  icon: null,
  padless: Boolean,
});
</script>

<template>
  <button
    type="button"
    :class="[
      'text-gray-900 flex items-center justify-center',
      padless ? '' : 'w-6 h-6',
    ]"
  >
    <slot>
      <component :is="icon" class="w-4 h-4" />
    </slot>
  </button>
</template>
