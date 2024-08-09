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
import { watch, ref } from 'vue';

const props = defineProps({
  placeholder: String,
  options: Array,
  loading: Boolean,
  color: {
    type: String,
    default: 'default',
  },
  withCreate: Boolean,
  optionNameResolve: Function,
  contentWrapperStatic: Boolean,
});
const emit = defineEmits(['focused', 'search', 'end-scroll', 'create']);

const visible = defineModel('visible');
const selected = defineModel();
const search = defineModel('search');

const highlightedOptionIndex = ref(-1);
const optionDivs = ref(null);
const wrapperDiv = ref(null);

function setSearchValue() {
  search.value = selected.value
    ? props.optionNameResolve
      ? props.optionNameResolve(selected.value)
      : selected.value.name
    : null;
}
function checkEndScroll(el) {
  if (el.scrollTop >= el.scrollHeight - el.clientHeight) {
    emit('end-scroll');
  }
}

function onFocus() {
  visible.value = true;

  emit('focused', search.value);
}
function onClose() {
  visible.value = false;
}
function onToggle() {
  if (!visible.value) {
    emit('focused', search.value);
  }

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
  checkEndScroll(e.target);
}
function onCreate() {
  emit('create', search.value);
}
function onKeyDown(e) {
  if (e.key === 'ArrowDown') {
    if (highlightedOptionIndex.value !== props.options.length - 1) {
      highlightedOptionIndex.value++;

      const wrapperRect = wrapperDiv.value.getBoundingClientRect();
      const optionRect =
        optionDivs.value[highlightedOptionIndex.value].getBoundingClientRect();

      if (optionRect.bottom > wrapperRect.bottom) {
        const offset = optionRect.bottom - wrapperRect.bottom;

        if (highlightedOptionIndex.value === props.options.length - 1) {
          wrapperDiv.value.scrollTop = wrapperRect.bottom;
        } else {
          wrapperDiv.value.scrollTop += offset;
        }
      }
    }
  } else if (e.key === 'ArrowUp') {
    if (
      highlightedOptionIndex.value !== null &&
      highlightedOptionIndex.value > 0
    ) {
      highlightedOptionIndex.value--;

      const wrapperRect = wrapperDiv.value.getBoundingClientRect();
      const optionRect =
        optionDivs.value[highlightedOptionIndex.value].getBoundingClientRect();

      if (optionRect.top < wrapperRect.top) {
        const offset = wrapperRect.top - optionRect.top;

        wrapperDiv.value.scrollTop -= offset;
      }
    }
  }
}
function onHoverOption(index) {
  highlightedOptionIndex.value = index;
}

watch(selected, () => {
  setSearchValue();
});

watch(visible, (value) => {
  if (!value) {
    setSearchValue();

    document.removeEventListener('keydown', onKeyDown);
  } else {
    highlightedOptionIndex.value = -1;

    document.addEventListener('keydown', onKeyDown);
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
        ref="wrapperDiv"
        :class="[
          'z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg flex flex-col py-1 max-h-[150px] overflow-y-auto',
          contentWrapperStatic ? 'static' : 'absolute',
        ]"
        @scroll="onScroll"
      >
        <p v-if="!options?.length" class="text-gray-400 px-3 py-2 text-center">
          Empty result
          <base-link v-if="withCreate && !!search" href="#" @click="onCreate"
            >Create "{{ search }}"</base-link
          >
        </p>
        <div
          v-for="(option, index) in options"
          :key="index"
          ref="optionDivs"
          :class="[
            'px-3 py-2',
            selected && selected.id === option.id
              ? 'bg-blue-600 text-white'
              : 'text-gray-900',
            highlightedOptionIndex === index &&
            (!selected || selected.id !== option.id)
              ? 'bg-gray-100'
              : '',
          ]"
          @mouseover="onHoverOption(index)"
          @click="onSelect(option)"
        >
          {{ optionNameResolve ? optionNameResolve(option) : option.name }}
        </div>
      </div>
    </transition>
  </div>
</template>
