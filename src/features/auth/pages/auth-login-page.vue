<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseButton from 'src/components/base/base-button.vue';
import {
  BrandGoogle as GoogleIcon,
  BrandGithub as GithubIcon,
} from '@vicons/tabler';
</script>

<template>
  <div class="max-w-sm mx-auto w-full">
    <base-card title="Login">
      <p class="text-gray-600">Login with your social account</p>
      <base-button color="transparent-bordered" fullwidth>
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
