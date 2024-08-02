<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from './features/auth/auth.store';
import AppToast from './components/app/app-toast.vue';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

async function loadMe() {
  if (authStore.loggedIn) {
    const res = await authStore.loadMe();

    if (!res.success) {
      router.push({ name: 'auth.login' });
    }
  }
}

loadMe();
</script>

<template>
  <app-toast />
  <component :is="route.meta.layout">
    <router-view />
  </component>
</template>
