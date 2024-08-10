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

router.afterEach((to) => {
  const pageTitle = to.meta.title;
  const appName = import.meta.env.VITE_APP_NAME;

  document.title = pageTitle ? `${pageTitle} - ${appName}` : appName;
});

loadMe();
</script>

<template>
  <app-toast />
  <component :is="route.meta.layout">
    <router-view />
  </component>
</template>
