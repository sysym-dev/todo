<script setup>
defineProps({
  href: String,
});
const emit = defineEmits(['click']);

function onClick() {
  emit('click');
}
</script>

<template>
  <a :href="href" class="text-blue-600" @click="onClick"><slot /></a>
</template>
