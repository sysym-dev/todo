<script setup>
defineProps({
  id: String,
  options: Array,
});

const selected = defineModel();
</script>

<template>
  <select
    :name="id"
    :id="id"
    class="block w-full border border-gray-200 rounded-lg h-10 hover:border-gray-300 text-gray-900 focus:border-blue-600 focus:outline-0"
    v-model="selected"
  >
    <option v-for="option in options" :key="option.id" :value="option.id">
      {{ option.name }}
    </option>
  </select>
</template>
