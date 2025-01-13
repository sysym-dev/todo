<script setup>
import BaseHeading from 'src/components/base/base-heading.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { reactive, ref } from 'vue';
import { useValidation } from 'src/cores/validation';
import { z } from 'zod';

const { error, validate } = useValidation(
  z.object({
    email: z
      .string({ required_error: 'Email cannot be empty' })
      .email({ message: 'Email invalid' }),
    password: z
      .string({ required_error: 'Password cannot be empty' })
      .min(6, { message: 'Password cannot be less than 6 characters' }),
  }),
);

const loading = ref(false);
const form = reactive({
  email: '',
  password: '',
});

async function onSubmit() {
  loading.value = true;

  const { success, data } = await validate(form);

  if (success) {
    console.log(data);
  }

  loading.value = false;
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="onSubmit">
    <base-heading title="Login" size="text-3xl" />
    <base-input
      placeholder="Email"
      :state="error.email ? 'error' : 'normal'"
      :message="error.email"
      v-model="form.email"
    />
    <base-input
      placeholder="Password"
      :state="error.password ? 'error' : 'normal'"
      :message="error.password"
      v-model="form.password"
    />
    <base-button fullwidth>Login</base-button>
  </form>
</template>
