<script setup>
defineProps({
  columns: Array,
  data: Object,
});
</script>

<template>
  <dl class="gap-4 grid grid-cols-2">
    <div v-for="column in columns" :key="column.id">
      <dt class="font-bold text-gray-900">{{ column.name }}</dt>
      <dd class="text-gray-900">
        <component v-if="column.render" :is="column.render" :item="data" />
        <template v-else>
          {{ column.value(data) }}
        </template>
      </dd>
    </div>
  </dl>
</template>
