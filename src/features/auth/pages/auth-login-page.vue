<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseAlert from 'src/components/base/base-alert.vue';
import {
  BrandGoogle as GoogleIcon,
  BrandGithub as GithubIcon,
} from '@vicons/tabler';
import { googleTokenLogin } from 'vue3-google-login';
import { useRequest } from 'src/cores/request/request';
import { generateGithubLoginUrl } from 'src/features/auth/auth.helpers';

const { loading, error, request, resetError } = useRequest();

async function onLoginGoogle() {
  const res = await googleTokenLogin();

  await request({
    url: '/api/login/google',
    method: 'post',
    data: {
      token: res.access_token,
    },
  });
}
function onLoginGithub() {
  window.location.href = generateGithubLoginUrl();
}
function onCloseError() {
  resetError();
}
</script>

<template>
  <div class="max-w-sm mx-auto w-full">
    <base-card title="Login">
      <p class="text-gray-600">Login with your social account</p>
      <base-alert v-if="error" with-close @close="onCloseError">
        {{ error }}
      </base-alert>
      <base-button
        :loading="loading"
        loading-block
        color="transparent-bordered"
        fullwidth
        @click="onLoginGoogle"
      >
        <google-icon class="w-4 h-4" />
        Login With Google
      </base-button>
      <base-button
        @click="onLoginGithub"
        color="transparent-bordered"
        fullwidth
      >
        <github-icon class="w-4 h-4" />
        Login With Github
      </base-button>
    </base-card>
  </div>
</template>
