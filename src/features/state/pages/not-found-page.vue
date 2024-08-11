<script setup>
import BaseButton from 'src/components/base/base-button.vue';
</script>

<template>
  <div class="space-y-2 text-center">
    <h1 class="font-bold text-3xl text-gray-900">404 Not Found</h1>
    <p class="text-gray-500 text-lg">Your requested page is not found</p>
    <router-link class="block" :to="{ name: 'home' }">
      <base-button color="transparent">Go Back</base-button>
    </router-link>
  </div>
</template>
