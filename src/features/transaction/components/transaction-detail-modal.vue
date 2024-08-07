<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseModal from 'src/components/base/base-modal.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseDescriptionList from 'src/components/base/base-description-list.vue';
import TransactionTypeBadge from './transaction-type-badge.vue';
import TransactionItemTable from './transaction-items-table.vue';
import { X as CloseIcon } from '@vicons/tabler';
import { useRequest } from 'src/cores/request/request';
import { formatCurrency } from 'src/utils/number';
import { formatDate } from 'src/utils/date';
import { h, computed } from 'vue';

const props = defineProps({
  transactionId: Number,
});

const {
  loading,
  request,
  data: transaction,
  error,
} = useRequest('/api/transactions', {
  initData: {},
  initLoading: true,
});

const visible = defineModel();

const withItems = computed(
  () => transaction.value.items && transaction.value.items.length,
);
const columns = computed(() => {
  return [
    {
      id: 'date',
      name: 'Date',
      value: (item) => formatDate(item.createdAt, 'YYYY/MM/DD'),
    },
    {
      id: 'type',
      name: 'Type',
      render: ({ item }) => h(TransactionTypeBadge, { transaction: item }),
    },
    {
      key: 'card',
      name: 'Card',
      value: (item) => item.card.name,
    },
    {
      key: 'category',
      name: 'Category',
      value: (item) =>
        item.transactionCategory ? item.transactionCategory.name : '-',
    },
    !withItems.value
      ? {
          id: 'totalAmount',
          name: 'Amount',
          value: (item) => formatCurrency(item.totalAmount),
        }
      : null,
    {
      id: 'description',
      name: 'Description',
      value: (item) => item.description ?? '-',
      class: 'col-span-2',
    },
    withItems.value
      ? {
          id: 'items',
          name: 'Item',
          class: 'col-span-2 space-y-1',
          render: ({ item }) => h(TransactionItemTable, { items: item.items }),
        }
      : null,
  ].filter((item) => !!item);
});

function onClose() {
  visible.value = false;
}
function onOpened() {
  request({
    url: `/api/transactions/${props.transactionId}`,
    params: {
      include: ['card', 'transaction_category', 'items'],
    },
  });
}
</script>

<template>
  <base-modal v-model="visible" @opened="onOpened">
    <base-card
      title="Detail Transaction"
      :title-loading="loading"
      :with-content="!loading"
      :error="!!error"
      :error-message="error"
      :shadow="false"
    >
      <template #action>
        <base-button size="square" color="transparent" @click="onClose">
          <close-icon class="w-4 h-4" />
        </base-button>
      </template>

      <base-description-list :columns="columns" :data="transaction" />
      <div v-if="withItems" class="grid grid-cols-2 gap-x-4">
        <p>Total Items Amount</p>
        <p class="text-right font-bold">
          {{ formatCurrency(transaction.totalAmount - transaction.amount) }}
        </p>
        <p>Amount</p>
        <p class="text-right font-bold">
          {{ formatCurrency(transaction.amount) }}
        </p>
        <p>Total Amount</p>
        <p class="text-right font-bold">
          {{ formatCurrency(transaction.totalAmount) }}
        </p>
      </div>
    </base-card>
  </base-modal>
</template>
