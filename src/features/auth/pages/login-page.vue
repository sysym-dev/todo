<script setup>
import BaseHeading from 'src/components/base/base-heading.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { inject, reactive, ref } from 'vue';
import { useValidation } from 'src/cores/validation';
import { z } from 'zod';
import { useRouter } from 'vue-router';

const supabase = inject('supabase');
const emitter = inject('emitter');
const router = useRouter();
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

  const validation = await validate(form);

  if (validation.success) {
    const res = await supabase.auth.signInWithPassword(validation.data);

    if (res.error) {
      emitter.emit('create-toast', {
        message: res.error.message,
      });
    } else {
      router.push({ name: 'home' });
    }
  }

  loading.value = false;
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="onSubmit">
    <base-heading title="Login" size="text-3xl" />
    <base-input
      type="email"
      placeholder="Email"
      :state="error.email ? 'error' : 'normal'"
      :message="error.email"
      v-model="form.email"
    />
    <base-input
      type="password"
      placeholder="Password"
      :state="error.password ? 'error' : 'normal'"
      :message="error.password"
      v-model="form.password"
    />
    <base-button fullwidth :loading="loading" :disabled="loading"
      >Login</base-button
    >
  </form>
</template>
