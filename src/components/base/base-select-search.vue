<script setup>
import BaseInput from './base-input.vue';
import BaseButton from './base-button.vue';
import {
  ChevronDown as ShowIcon,
  ChevronUp as HideIcon,
  X as ClearIcon,
} from '@vicons/tabler';
import { ref, watch } from 'vue';

defineProps({
  placeholder: String,
  options: Array,
});
const emit = defineEmits(['focused']);

const visible = ref(false);
const selected = ref(null);
const search = ref(null);

function onFocus() {
  visible.value = true;

  emit('focused');
}
function onClose() {
  search.value = selected.value ? selected.value.name : null;

  visible.value = false;
}
function onToggle() {
  visible.value = !visible.value;
}
function onSelect(value) {
  selected.value = { ...value };

  visible.value = false;
}
function onClear() {
  selected.value = null;
  visible.value = false;
}

watch(selected, () => {
  search.value = selected.value ? selected.value.name : null;
});
</script>

<template>
  <div class="relative" v-click-outside="onClose">
    <base-input :placeholder="placeholder" @focus="onFocus" v-model="search">
      <template #append>
        <div class="absolute top-0 right-0 h-full flex items-center pr-2">
          <base-button
            v-if="selected"
            size="square"
            color="transparent"
            @click="onClear"
          >
            <clear-icon class="w-4 h-4" />
          </base-button>
          <base-button size="square" color="transparent" @click="onToggle">
            <component :is="visible ? HideIcon : ShowIcon" class="w-4 h-4" />
          </base-button>
        </div>
      </template>
    </base-input>
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
        class="z-10 absolute w-full mt-2 bg-white border border-gray-200 rounded-lg flex flex-col py-1"
      >
        <div
          v-for="option in options"
          :key="option.id"
          href="#"
          :class="[
            'px-3 py-2',
            selected && selected.id === option.id
              ? 'bg-blue-600 text-white'
              : 'text-gray-900 hover:bg-gray-100',
          ]"
          @click="onSelect(option)"
        >
          {{ option.name }}
        </div>
      </div>
    </transition>
  </div>
</template>
