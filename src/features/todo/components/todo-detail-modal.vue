<script setup>
import BaseModal from 'src/components/base/base-modal.vue';
import { parseDate } from 'src/utils/date';

defineProps({
  todo: Object,
});
</script>
<template>
  <base-modal>
    <dl class="space-y-4">
      <div class="space-y-1">
        <dt class="font-bold text-gray-900">Name</dt>
        <p class="text-gray-600">{{ todo.name }}</p>
      </div>
      <div class="space-y-1">
        <dt class="font-bold text-gray-900">Date</dt>
        <p class="text-gray-600">
          {{ parseDate(todo.date).format('YYYY/MM/DD') }}
        </p>
      </div>
    </dl>
  </base-modal>
</template>
