<script setup>
import BaseTable from 'src/components/base/base-table.vue';
import { formatCurrency } from 'src/utils/number';

defineProps({
  items: Array,
});

const columns = [
  {
    key: 'category',
    name: 'Category',
    value: (item) =>
      item.transactionCategory ? item.transactionCategory.name : '-',
  },
  {
    key: 'amount',
    name: 'Amount',
    value: (item) => formatCurrency(item.amount),
  },
  {
    key: 'description',
    name: 'Description',
    value: (item) => item.description ?? '-',
  },
];
</script>

<template>
  <base-table
    :columns="columns"
    :data="items"
    :meta="{ total: items.length }"
    :with-pagination="false"
  >
  </base-table>
</template>
