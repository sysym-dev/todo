<script setup>
import BaseModal from 'src/components/base/base-modal.vue';
import BaseCard from 'src/components/base/base-card.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { useRequest } from 'src/cores/request/request';
import { useAuthStore } from 'src/features/auth/auth.store';
import { useRouter } from 'vue-router';

const { loading, request } = useRequest('/api/logout');

const authStore = useAuthStore();
const router = useRouter();

const visible = defineModel();

function onCancel() {
  visible.value = false;
}
async function onConfirm() {
  await request({
    method: 'post',
  });

  authStore.logout();

  router.push({
    name: 'auth.login',
  });
}
</script>

<template>
  <base-modal v-model="visible">
    <base-card title="Confirm Sign Out" :shadow="false">
      <p class="text-gray-500">
        Are you sure want to sign out from your account?
      </p>
      <div class="space-x-2">
        <base-button color="red" :loading="loading" @click="onConfirm"
          >Yes, Logout</base-button
        >
        <base-button color="transparent" @click="onCancel">Cancel</base-button>
      </div>
    </base-card>
  </base-modal>
</template>
