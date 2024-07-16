<script setup>
import BaseInput from './base-input.vue';
import BaseButton from './base-button.vue';
import BaseSpinner from './base-spinner.vue';
import BaseLink from './base-link.vue';
import {
  ChevronDown as ShowIcon,
  ChevronUp as HideIcon,
  X as ClearIcon,
} from '@vicons/tabler';
import { ref, watch } from 'vue';

defineProps({
  placeholder: String,
  options: Array,
  loading: Boolean,
  color: {
    type: String,
    default: 'default',
  },
  withCreate: Boolean,
});
const emit = defineEmits(['focused', 'search', 'end-scroll', 'create']);

const visible = defineModel('visible');
const selected = defineModel();
const search = defineModel('search');

function setSearchValue() {
  search.value = selected.value ? selected.value.name : null;
}

function onFocus() {
  visible.value = true;

  emit('focused', search.value);
}
function onClose() {
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
function onSearch() {
  emit('search', search.value);
}
function onScroll(e) {
  if (e.target.scrollTop >= e.target.scrollHeight - e.target.clientHeight) {
    emit('end-scroll');
  }
}
function onCreate() {
  emit('create', search.value);
}

watch(selected, () => {
  setSearchValue();
});

watch(visible, (value) => {
  if (!value) {
    setSearchValue();
  }
});

setSearchValue();
</script>

<template>
  <div class="relative" v-click-outside="onClose">
    <base-input
      :color="color"
      :placeholder="placeholder"
      v-model="search"
      @focus="onFocus"
      @input-debounce="onSearch"
    >
      <template #append>
        <div class="absolute top-0 right-0 h-full flex items-center pr-2">
          <base-spinner
            v-if="loading"
            :color="color === 'red' ? 'red' : 'blue'"
          />
          <template v-else>
            <base-button
              v-if="selected"
              size="square"
              :color="color === 'red' ? 'transparent-red' : 'transparent'"
              @click="onClear"
            >
              <clear-icon class="w-4 h-4" />
            </base-button>
            <base-button
              size="square"
              :color="color === 'red' ? 'transparent-red' : 'transparent'"
              @click="onToggle"
            >
              <component :is="visible ? HideIcon : ShowIcon" class="w-4 h-4" />
            </base-button>
          </template>
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
        class="z-10 absolute w-full mt-2 bg-white border border-gray-200 rounded-lg flex flex-col py-1 max-h-[150px] overflow-y-auto"
        @scroll="onScroll"
      >
        <p v-if="!options?.length" class="text-gray-400 px-3 py-2 text-center">
          Empty result
          <base-link v-if="withCreate" href="#" @click="onCreate"
            >Create "{{ search }}"</base-link
          >
        </p>
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
