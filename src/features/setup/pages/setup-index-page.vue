<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { reactive } from 'vue';
import { useAuthStore } from 'src/features/auth/auth.store';
import { useRequest } from 'src/cores/request/request';
import { useValidation } from 'src/cores/validation/validation';
import { useRouter } from 'vue-router';
import { z } from 'zod';

const { validate, hasError, getError, resetError } = useValidation(
  z.object({
    fullName: z
      .string({
        invalid_type_error: 'name must be a string',
        required_error: 'name is required',
      })
      .min(1, 'name cannot be empty'),
    defaultCardName: z
      .string({
        invalid_type_error: 'default card name must be a string',
        required_error: 'default card name is required',
      })
      .min(1, 'default card name cannot be empty'),
    defaultCardBalance: z.coerce
      .number({
        invalid_type_error: 'default card balance must be a number',
        required_error: 'default card balance is required',
      })
      .positive({ message: 'default card balance must be positive' })
      .nullable()
      .optional(),
  }),
);
const { request, loading, error } = useRequest('/api/me/setup');
const authStore = useAuthStore();
const router = useRouter();

const form = reactive({
  fullName: authStore.me.fullName,
  defaultCardName: authStore.me.defaultCard.name,
  defaultCardBalance: null,
});

async function onSubmit() {
  resetError();

  const validation = await validate(form);

  if (validation.success) {
    const res = await request({
      method: 'patch',
      data: validation.data,
    });

    if (res.success) {
      await authStore.loadMe();

      router.push({
        name: 'home',
      });
    }
  }
}
</script>

<template>
  <div class="max-w-sm mx-auto w-full">
    <base-card
      title="Let's setup your account"
      :error="!!error"
      :error-message="error"
      :error-block="false"
    >
      <form class="space-y-4" @submit.prevent="onSubmit">
        <base-form-item
          label="Username"
          :color="hasError('fullName') ? 'red' : 'default'"
          :message="getError('fullName')"
        >
          <base-input
            placeholder="Username"
            :color="hasError('fullName') ? 'red' : 'default'"
            v-model="form.fullName"
          />
        </base-form-item>
        <base-form-item
          label="Default Card Name"
          :color="hasError('defaultCardName') ? 'red' : 'default'"
          :message="getError('defaultCardName')"
        >
          <base-input
            placeholder="Default Card Name"
            :color="hasError('defaultCardName') ? 'red' : 'default'"
            v-model="form.defaultCardName"
          />
        </base-form-item>
        <base-form-item
          label="Initial Balance"
          :color="hasError('defaultCardBalance') ? 'red' : 'default'"
          :message="getError('defaultCardBalance')"
        >
          <base-input
            placeholder="Initial Balance"
            :color="hasError('defaultCardBalance') ? 'red' : 'default'"
            v-model="form.defaultCardBalance"
          />
        </base-form-item>
        <div class="flex justify-between">
          <base-button color="transparent">Skip</base-button>
          <base-button :loading="loading" type="submit">Next</base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>
