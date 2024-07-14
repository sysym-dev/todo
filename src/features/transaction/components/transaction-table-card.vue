<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseBadge from 'src/components/base/base-badge.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseTable from 'src/components/base/base-table.vue';
import TransactionNewModal from './transaction-new-modal.vue';
import { ref, h, reactive } from 'vue';
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
const params = reactive({
  page: 1,
  sort: '-id',
  limit: 2,
});
const columns = [
  {
    key: 'createdAt',
    name: 'Date',
    value: (item) => formatDate(item.createdAt, 'YYYY/MM/DD'),
  },
  {
    key: 'type',
    name: 'Type',
    itemClass: 'capitalize',
    render: ({ item }) =>
      h(
        BaseBadge,
        { color: item.type === 'income' ? 'green' : 'red' },
        {
          default: () => item.type,
        },
      ),
  },
  {
    key: 'amount',
    name: 'Amount',
    value: (item) => formatCurrency(item.amount),
  },
];

function loadTransactions() {
  request({
    params,
  });
}

function onOpenCreateModal() {
  createModalVisible.value = true;
}
function onSuccessCreate() {
  loadTransactions();
}
function onChangePage() {
  loadTransactions();
}

loadTransactions();
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

      <base-table
        :columns="columns"
        :meta="transactions.meta"
        :data="transactions.data"
        v-model:page="params.page"
        @change-page="onChangePage"
      />
    </base-card>

    <transaction-new-modal
      v-model="createModalVisible"
      @success="onSuccessCreate"
    />
  </div>
</template>
