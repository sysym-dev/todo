<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import { useRequest } from 'src/cores/request/request';
import { formatCurrency } from 'src/utils/number';
import { inject, onUnmounted } from 'vue';

const emitter = inject('emitter');
const { loading, request, data, error } = useRequest('/api/me', {
  initData: {
    balance: 0,
    income: 0,
    expense: 0,
  },
  initLoading: true,
});

function onTransactionCreated() {
  request();
}

emitter.on('transaction-created', onTransactionCreated);

onUnmounted(() => {
  emitter.off('transaction-created', onTransactionCreated);
});

request();
</script>

<template>
  <base-card
    title="Summary"
    :title-loading="loading"
    :with-content="!loading"
    :error="!!error"
    :error-message="error"
  >
    <div class="grid grid-cols-3 gap-4">
      <div>
        <p class="font-bold text-xl text-gray-900">
          {{ formatCurrency(data.balance) }}
        </p>
        <p class="text-sm text-gray-600">Balance</p>
      </div>
      <div>
        <p class="font-bold text-xl text-gray-900">
          {{ formatCurrency(data.income) }}
        </p>
        <p class="text-sm text-gray-600">Income</p>
      </div>
      <div>
        <p class="font-bold text-xl text-gray-900">
          {{ formatCurrency(data.expense) }}
        </p>
        <p class="text-sm text-gray-600">Expense</p>
      </div>
    </div>
  </base-card>
</template>
