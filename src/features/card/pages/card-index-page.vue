<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseTable from 'src/components/base/base-table.vue';
import { useRequest } from 'src/cores/request/request';
import { formatCurrency } from 'src/utils/number';
import { formatDate } from 'src/utils/date';

const {
  loading,
  request,
  data: cards,
  error,
  requested,
} = useRequest('/api/cards', {
  initLoading: true,
  initData: {
    meta: {
      total: 0,
    },
    data: [],
  },
});

const columns = [
  {
    key: 'name',
    name: 'Name',
  },
  {
    key: 'balance',
    name: 'Balance',
    value: (item) => formatCurrency(item.balance),
  },
  {
    key: 'updatedAt',
    name: 'Last Updated',
    value: (item) => formatDate(item.createdAt, 'DD MMMM YYYY HH:mm'),
  },
  {
    key: 'createdAt',
    name: 'Created At',
    value: (item) => formatDate(item.createdAt, 'DD MMMM YYYY HH:mm'),
  },
];

request();
</script>

<template>
  <base-card
    title="Cards"
    :title-loading="loading"
    :with-content="requested || !loading"
    :error="!!error"
    :error-message="error"
  >
    <base-table
      :columns="columns"
      :data="cards.data"
      :meta="cards.meta"
    ></base-table>
  </base-card>
</template>
