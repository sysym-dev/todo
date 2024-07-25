<script setup>
import { useRoute } from 'vue-router';
import { useAuthStore } from './features/auth/auth.store';
import AppToast from './components/app/app-toast.vue';

const authStore = useAuthStore();

const route = useRoute();

authStore.loadMe();
</script>

<template>
  <app-toast />
  <component :is="route.meta.layout">
    <router-view />
  </component>
</template>
