<script setup>
defineProps({
  type: {
    type: String,
    default: 'text',
  },
  id: String,
  placeholder: String,
});
</script>

<template>
  <input
    :type="type"
    :name="id"
    :id="id"
    class="block w-full border border-gray-200 rounded-lg h-10 placeholder-gray-300 hover:border-gray-300 text-gray-900 focus:border-blue-600 focus:outline-0"
    :placeholder="placeholder"
  />
</template>
