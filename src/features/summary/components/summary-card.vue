<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import { formatCurrency } from 'src/utils/number';
import { inject, onUnmounted } from 'vue';
import { useAuthStore } from 'src/features/auth/auth.store';

const emitter = inject('emitter');
const authStore = useAuthStore();

function onTransactionCreated() {
  authStore.loadMe();
}

emitter.on('transaction-created', onTransactionCreated);

onUnmounted(() => {
  emitter.off('transaction-created', onTransactionCreated);
});
</script>

<template>
  <base-card
    title="Summary"
    :title-loading="authStore.loading"
    :with-content="!authStore.loading"
    :error="!!authStore.error"
    :error-message="authStore.error"
  >
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <p class="font-bold text-xl text-gray-900">
          {{ formatCurrency(authStore.me.balance) }}
        </p>
        <p class="text-sm text-gray-600">Balance</p>
      </div>
      <div>
        <p class="font-bold text-xl text-gray-900">
          {{ formatCurrency(authStore.me.income) }}
        </p>
        <p class="text-sm text-gray-600">Income</p>
      </div>
      <div>
        <p class="font-bold text-xl text-gray-900">
          {{ formatCurrency(authStore.me.expense) }}
        </p>
        <p class="text-sm text-gray-600">Expense</p>
      </div>
    </div>
  </base-card>
</template>
