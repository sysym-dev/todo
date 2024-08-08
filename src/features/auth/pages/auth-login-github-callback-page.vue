<script setup>
import { useRequest } from 'src/cores/request/request';
import { useRoute, useRouter } from 'vue-router';
import { inject } from 'vue';
import { useAuthStore } from 'src/features/auth/auth.store';

const emitter = inject('emitter');
const route = useRoute();
const router = useRouter();
const { request } = useRequest('/api/login/github');
const authStore = useAuthStore();

async function login() {
  const res = await request({
    data: {
      code: route.query.code,
    },
    method: 'post',
  });

  if (!res.success) {
    emitter.emit('create-toast', {
      message: res.error,
    });
    router.push({ name: 'auth.login' });
  } else {
    authStore.login(res.data);
    await authStore.loadMe();

    if (authStore.me.setupFinished) {
      router.push({ name: 'home' });
    } else {
      router.push({ name: 'setup' });
    }
  }
}
async function connectToGithub() {
  const res = await request({
    url: '/api/me/github',
    data: {
      code: route.query.code,
    },
    method: 'patch',
  });

  if (!res.success) {
    emitter.emit('create-toast', {
      message: res.error,
    });
    router.push({ name: 'profile' });
  } else {
    await authStore.loadMe();
    router.push({ name: 'profile' });
  }
}

if (!route.query.code) {
  if (authStore.loggedIn) {
    router.push({
      name: 'profile',
    });
  } else {
    router.push({
      name: 'auth.login',
    });
  }
} else {
  if (authStore.loggedIn) {
    connectToGithub();
  } else {
    login();
  }
}
</script>

<template>
  <p class="text-2xl text-gray-400 animate-pulse animate-bounce">
    Authorizing your github account...
  </p>
</template>
