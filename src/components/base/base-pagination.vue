<script setup>
import {
  ChevronRight as NextIcon,
  ChevronLeft as PrevIcon,
} from '@vicons/tabler';

defineProps({
  meta: {
    type: Object,
    default: () => ({
      total: 0,
      lastPage: 1,
    }),
  },
});
const emit = defineEmits(['change']);

const currentPage = defineModel();

function onNext() {
  currentPage.value++;

  emit('change');
}
function onPrev() {
  currentPage.value--;

  emit('change');
}
function onChange(page) {
  if (page !== currentPage.value) {
    currentPage.value = page;

    emit('change');
  }
}
</script>

<template>
  <div class="flex justify-end">
    <div class="flex items-center gap-x-1">
      <a
        v-if="currentPage > 1"
        href="#"
        class="flex items-center justify-center rounded-md text-sm w-7 h-7 text-gray-900 hover:bg-gray-100"
        @click="onPrev"
      >
        <prev-icon class="w-4 h-4" />
      </a>
      <a
        v-for="page in meta.lastPage"
        :key="page"
        href="#"
        :class="[
          'flex items-center justify-center rounded-md text-sm w-7 h-7',
          page === currentPage
            ? 'bg-blue-600 text-white'
            : 'text-gray-900 hover:bg-gray-100',
        ]"
        @click="onChange(page)"
        >{{ page }}</a
      >
      <a
        v-if="currentPage < meta.lastPage"
        href="#"
        class="flex items-center justify-center rounded-md text-sm w-7 h-7 text-gray-900 hover:bg-gray-100"
        @click="onNext"
      >
        <next-icon class="w-4 h-4" />
      </a>
    </div>
  </div>
</template>
