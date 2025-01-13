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
  textarea: Boolean,
  message: String,
  type: {
    type: String,
    default: 'text',
  },
});
const emit = defineEmits(['input', 'keydown']);

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
  if (props.textarea && input.value.scrollHeight > 42) {
    input.value.style.height = 'auto';
    input.value.style.height = Math.max(input.value.scrollHeight, 42) + 'px';
  }

  emit('input');
}
function onKeyDown(e) {
  emit('keydown', e);
}

defineExpose({
  input,
});
</script>

<template>
  <div class="relative min-h-[42px]">
    <slot name="prepend" />
    <textarea
      v-if="textarea"
      ref="input"
      rows="1"
      :class="[
        'w-full h-full overflow-hidden resize-none',
        color,
        classes.input,
      ]"
      :placeholder="placeholder"
      v-model="value"
      @input="onInput"
      @keydown="onKeyDown"
    ></textarea>
    <input
      v-else
      ref="input"
      :type="type"
      :class="['w-full', color, classes.input]"
      :placeholder="placeholder"
      v-model="value"
      @input="onInput"
    />
    <p v-if="message" class="text-red-600 mt-1">{{ message }}</p>
    <slot name="append" />
  </div>
</template>
