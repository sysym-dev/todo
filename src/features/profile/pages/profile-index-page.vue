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
import { computed, reactive } from 'vue';
import { useValidation } from 'src/cores/validation/validation';
import { z } from 'zod';
import { useRequest } from 'src/cores/request/request';

const authStore = useAuthStore();
const {
  loading,
  error,
  request,
  resetError: resetErrorRequest,
} = useRequest('/api/me');
const {
  validate,
  hasError,
  getError,
  resetError: resetErrorValidation,
} = useValidation(
  z.object({
    fullName: z
      .string({
        invalid_type_error: 'name must be a string',
        required_error: 'name is required',
      })
      .min(1, 'name cannot be empty'),
  }),
);

const form = reactive({
  fullName: '',
});
const formDirty = computed(() => {
  return form.fullName !== authStore.me.fullName;
});

function setForm() {
  form.fullName = authStore.me.fullName;
}

function onResetForm() {
  resetErrorValidation();
  setForm();
}
async function onSave() {
  const validation = await validate(form);

  if (validation.success) {
    const res = await request({
      method: 'get',
      data: validation.data,
    });

    if (res.success) {
      authStore.loadMe();

      setForm();
    }
  }
}

setForm();
</script>

<template>
  <base-card
    title="Profile"
    :error="!!error"
    :error-message="error"
    :error-block="false"
  >
    <template #action v-if="formDirty">
      <div class="space-x-2">
        <base-button size="sm" color="transparent-bordered" @click="onResetForm"
          >Reset</base-button
        >
        <base-button :loading="loading" size="sm" @click="onSave"
          >Save</base-button
        >
      </div>
    </template>
    <base-form-item
      label="Full Name"
      :color="hasError('fullName') ? 'red' : 'default'"
      :message="getError('fullName')"
    >
      <base-input
        placeholder="Full Name"
        :color="hasError('fullName') ? 'red' : 'default'"
        v-model="form.fullName"
      />
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
