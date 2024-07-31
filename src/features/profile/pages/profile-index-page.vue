<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseBadge from 'src/components/base/base-badge.vue';
import {
  BrandGoogle as GoogleIcon,
  BrandGithub as GithubIcon,
  Check as CheckIcon,
} from '@vicons/tabler';
import { useAuthStore } from 'src/features/auth/auth.store';
import { reactive } from 'vue';

const authStore = useAuthStore();
</script>

<template>
  <base-card title="Profile">
    <base-form-item label="Full Name">
      <base-input placeholder="Full Name" v-model="authStore.me.fullName" />
    </base-form-item>
    <base-form-item label="Email">
      <base-input placeholder="Email" v-model="authStore.me.email" disabled />
    </base-form-item>
    <div class="max-w-[200px]">
      <base-form-item label="Connected Account">
        <div class="grid grid-cols-1 gap-2">
          <base-button
            color="transparent-bordered"
            :disabled="authStore.me.googleId"
          >
            <google-icon class="w-4 h-4" />
            {{ !authStore.me.googleId ? 'Connect' : '' }} Google

            <template #badge-top v-if="authStore.me.googleId">
              <base-badge size="circle-sm" color="green">
                <check-icon class="w-4 h-4" />
              </base-badge>
            </template>
          </base-button>
          <base-button
            color="transparent-bordered"
            :disabled="authStore.me.githubId"
          >
            <github-icon class="w-4 h-4" />
            {{ !authStore.me.githubId ? 'Connect' : '' }} Github

            <template #badge-top v-if="authStore.me.githubId">
              <base-badge size="circle-sm" color="green">
                <check-icon class="w-4 h-4" />
              </base-badge>
            </template>
          </base-button>
        </div>
      </base-form-item>
    </div>
  </base-card>
</template>
