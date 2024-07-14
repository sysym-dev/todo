<script setup>
import { computed } from 'vue';
import { debounce } from 'src/utils/debounce';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  size: {
    type: String,
    default: 'md',
  },
  color: {
    type: String,
    default: 'default',
  },
  id: String,
  placeholder: String,
});
const emit = defineEmits(['focus', 'input-debounce']);

const value = defineModel();

const size = computed(() => {
  return {
    md: 'text-base px-3 h-10 rounded-lg',
    sm: 'text-sm px-2 h-7 rounded-md',
  }[props.size];
});
const color = computed(() => {
  return {
    default:
      'border-gray-200 placeholder-gray-300 hover:border-gray-300 text-gray-900 focus:border-blue-600',
    red: 'border-red-400 bg-red-50 placeholder-red-400 hover:border-red-500 text-red-600 focus:border-red-600',
  }[props.color];
});

const emitInputDebounce = debounce(() => emit('input-debounce'));

function onFocus() {
  emit('focus');
}
function onInput() {
  emitInputDebounce();
}
</script>

<template>
  <div class="relative">
    <input
      :type="type"
      :name="id"
      :id="id"
      :class="['block w-full border focus:outline-0 focus:ring-0', size, color]"
      :placeholder="placeholder"
      v-model="value"
      @focus="onFocus"
      @input="onInput"
    />
    <slot name="append" />
  </div>
</template>
