<script setup>
import SummaryCard from 'src/features/summary/components/summary-card.vue';
import CardListCard from 'src/features/card/components/card-list-card.vue';
import TransactionTableCard from 'src/features/transaction/components/transaction-table-card.vue';
import { parseDate } from 'src/utils/date';

const defaultTransactionDateRange = {
  from_date: parseDate().startOf('month').toISOString(),
  to_date: parseDate().endOf('month').toISOString(),
};
</script>

<template>
  <summary-card />
  <card-list-card />
  <transaction-table-card :default-date-range="defaultTransactionDateRange" />
</template>
