<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { reactive } from 'vue';
import { useAuthStore } from 'src/features/auth/auth.store';

const authStore = useAuthStore();

const form = reactive({
  fullName: authStore.me.fullName,
  defaultCardName: authStore.me.defaultCard.name,
  defaultCardBalance: null,
});
</script>

<template>
  <div class="max-w-sm mx-auto w-full">
    <base-card title="Let's setup your account">
      <base-form-item label="Username">
        <base-input placeholder="Username" v-model="form.fullName" />
      </base-form-item>
      <base-form-item label="Default Card Name">
        <base-input
          placeholder="Default Card Name"
          v-model="form.defaultCardName"
        />
      </base-form-item>
      <base-form-item label="Initial Balance">
        <base-input
          placeholder="Initial Balance"
          v-model="form.defaultCardBalance"
        />
      </base-form-item>
      <div class="flex justify-between">
        <base-button color="transparent">Skip</base-button>
        <base-button>Next</base-button>
      </div>
    </base-card>
  </div>
</template>
