<script setup>
import { useRoute } from 'vue-router';
import { useAuthStore } from './features/auth/auth.store';

const authStore = useAuthStore();

const route = useRoute();

authStore.loadMe();
</script>

<template>
  <component :is="route.meta.layout">
    <router-view />
  </component>
</template>
