<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: 'default',
  },
});

const color = computed(() => {
  return {
    default: {
      wrapper: 'border-gray-200 hover:border-gray-300 text-gray-900',
      button: 'text-gray-900',
      file: fileName.value ? 'text-gray-900' : 'text-gray-300',
    },
    red: {
      wrapper: 'border-red-400 bg-red-50 hover:border-red-500 text-red-600',
      button: 'text-red-600',
      file: fileName.value ? 'text-red-600' : 'text-red-600',
    },
  }[props.color];
});

const file = defineModel();
const fileName = ref(null);

function onChangeFile(e) {
  file.value = e.target.files[0];
  fileName.value = e.target.files[0].name;
}
</script>

<template>
  <label
    :class="[
      'w-full border focus:outline-0 focus:ring-0 flex h-10 text-base rounded-lg items-center',
      color.wrapper,
    ]"
  >
    <input type="file" class="hidden" @change="onChangeFile" />
    <div
      :class="[
        'bg-gray-100 h-full flex items-center rounded-l-lg px-3 border-r',
        color.button,
      ]"
    >
      Upload
    </div>
    <div :class="['px-3 truncate', color.file]">
      {{ fileName ?? 'Select file' }}
    </div>
  </label>
</template>
