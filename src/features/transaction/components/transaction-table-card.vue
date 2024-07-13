<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseBadge from 'src/components/base/base-badge.vue';
import BaseButton from 'src/components/base/base-button.vue';
import TransactionNewModal from './transaction-new-modal.vue';
import { ref } from 'vue';
import { useRequest } from 'src/cores/request/request';
import { formatCurrency } from 'src/utils/number';
import { formatDate } from 'src/utils/date';

const {
  loading,
  request,
  data: transactions,
  error,
  requested,
} = useRequest('/api/transactions', {
  initData: {
    data: [],
  },
  initLoading: true,
});

const createModalVisible = ref(false);

function onOpenCreateModal() {
  createModalVisible.value = true;
}
function onSuccessCreate() {
  request();
}

request();
</script>

<template>
  <div>
    <base-card
      title="Transactions"
      :title-loading="loading"
      :with-content="requested || !loading"
      :error="!!error"
      :error-message="error"
    >
      <template v-if="(requested || !loading) && !error" #action>
        <base-button size="sm" @click="onOpenCreateModal"
          >New Transaction</base-button
        >
      </template>

      <table class="w-full border rounded-lg border-separate border-spacing-0">
        <thead>
          <tr>
            <th class="text-left border-b text-gray-900 py-2 px-3">Date</th>
            <th class="text-left border-b text-gray-900 py-2 px-3">Type</th>
            <th class="text-left border-b text-gray-900 py-2 px-3">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions.data" :key="transaction.id">
            <td class="border-b text-gray-900 py-2 px-3">
              {{ formatDate(transaction.createdAt, 'YYYY/MM/DD') }}
            </td>
            <td class="border-b text-gray-900 py-2 px-3">
              <base-badge color="red">{{ transaction.type }}</base-badge>
            </td>
            <td class="border-b text-gray-900 py-2 px-3">
              {{ formatCurrency(transaction.amount) }}
            </td>
          </tr>
        </tbody>
      </table>
    </base-card>

    <transaction-new-modal
      v-model="createModalVisible"
      @success="onSuccessCreate"
    />
  </div>
</template>
