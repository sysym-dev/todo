<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseAlert from 'src/components/base/base-alert.vue';
import {
  BrandGoogle as GoogleIcon,
  BrandGithub as GithubIcon,
} from '@vicons/tabler';
import { googleTokenLogin } from 'vue3-google-login';

async function onLoginGoogle() {
  const res = await googleTokenLogin();

  // res.access_token
}
</script>

<template>
  <div class="max-w-sm mx-auto w-full">
    <base-card title="Login">
      <p class="text-gray-600">Login with your social account</p>
      <base-alert v-if="false">
        {{ 'errorMessage' }}
      </base-alert>
      <base-button
        :loading="false"
        loading-block
        color="transparent-bordered"
        fullwidth
        @click="onLoginGoogle"
      >
        <google-icon class="w-4 h-4" />
        Login With Google
      </base-button>
      <base-button color="transparent-bordered" fullwidth>
        <github-icon class="w-4 h-4" />
        Login With Github
      </base-button>
    </base-card>
  </div>
</template>
