<script setup>
import { useRequest } from 'src/cores/request/request';
import { useRoute, useRouter } from 'vue-router';
import { inject } from 'vue';

const emitter = inject('emitter');
const route = useRoute();
const router = useRouter();
const { request } = useRequest('/api/login/github');

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
  }
}

if (!route.query.code) {
  router.push({
    name: 'auth.login',
  });
} else {
  login();
}
</script>

<template>
  <p class="text-2xl text-gray-400 animate-pulse animate-bounce">
    Authorizing your github account...
  </p>
</template>
