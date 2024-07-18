<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseModal from 'src/components/base/base-modal.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseDescriptionList from 'src/components/base/base-description-list.vue';
import TransactionTypeBadge from './transaction-type-badge.vue';
import { X as CloseIcon } from '@vicons/tabler';
import { useRequest } from 'src/cores/request/request';
import { formatCurrency } from 'src/utils/number';
import { formatDate } from 'src/utils/date';
import { h } from 'vue';

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

const columns = [
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
    id: 'totalAmount',
    name: 'Amount',
    value: (item) => formatCurrency(item.totalAmount),
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
  {
    id: 'description',
    name: 'Description',
    class: 'col-span-2',
    value: (item) => item.description ?? '-',
  },
];

function onClose() {
  visible.value = false;
}
function onOpened() {
  request({
    url: `/api/transactions/${props.transactionId}`,
    params: {
      include: ['card', 'transaction_category'],
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
    >
      <template #action>
        <base-button size="square" color="transparent" @click="onClose">
          <close-icon class="w-4 h-4" />
        </base-button>
      </template>

      <base-description-list :columns="columns" :data="transaction" />
    </base-card>
  </base-modal>
</template>
