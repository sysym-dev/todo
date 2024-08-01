<script setup>
import { computed } from 'vue';
import { X as DismissIcon } from '@vicons/tabler';
import BaseButton from './base-button.vue';

const props = defineProps({
  color: {
    type: String,
    default: 'red',
  },
  withDismiss: Boolean,
});
const emit = defineEmits(['dismiss']);

const color = computed(() => {
  return {
    red: 'bg-red-50 text-red-600 border-red-300',
    gray: 'bg-gray-50 text-gray-600 border-gray-300',
    green: 'bg-green-50 text-green-600 border-green-300',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-400',
  }[props.color];
});

function onDismiss() {
  emit('dismiss');
}
</script>

<template>
  <div
    :class="[
      'flex items-center justify-between min-h-10 px-3 rounded-lg border break-all py-1.5',
      color,
    ]"
  >
    <slot />
    <base-button
      v-if="withDismiss"
      size="square"
      color="transparent-red"
      @click="onDismiss"
    >
      <dismiss-icon class="w-4 h-4" />
    </base-button>
  </div>
</template>
