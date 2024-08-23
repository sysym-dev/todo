<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  placeholder: String,
  state: {
    type: String,
    default: 'normal',
  },
  classes: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(['input']);

const value = defineModel();

const input = ref();

const color = computed(() => {
  return {
    normal: '',
    error:
      'border-red-600 focus:ring-red-600 focus:border-red-600 text-red-600 placeholder-red-600',
  }[props.state];
});

function onInput() {
  emit('input');
}

defineExpose({
  input,
});
</script>

<template>
  <div class="relative">
    <slot name="prepend" />
    <input
      ref="input"
      type="text"
      :class="['w-full', color, classes.input]"
      :placeholder="placeholder"
      v-model="value"
      @input="onInput"
    />
    <slot name="append" />
  </div>
</template>
