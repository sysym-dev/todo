<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

router.afterEach((to) => {
  const appTitle = import.meta.env.VITE_APP_TITLE;
  const pageTitle = to.meta.title;

  document.title = `${appTitle} - ${pageTitle}`;
});
</script>

<template>
  <component :is="route.meta.layout ?? 'div'">
    <router-view />
  </component>
</template>
