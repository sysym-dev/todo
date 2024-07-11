<script setup>
import SummaryCard from 'src/features/summary/components/summary-card.vue';
import CardListCard from 'src/features/card/components/card-list-card.vue';
import TransactionTableCard from 'src/features/transaction/components/transaction-table-card.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center py-16">
    <div class="space-y-4 max-w-3xl w-full">
      <summary-card />
      <card-list-card />
      <transaction-table-card />
    </div>
  </div>
</template>
