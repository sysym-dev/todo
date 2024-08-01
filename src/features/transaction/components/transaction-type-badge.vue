<script setup>
import BaseBadge from 'src/components/base/base-badge.vue';

defineProps({
  transaction: Object,
});
</script>

<template>
  <div class="space-x-1">
    <base-badge :color="transaction.type === 'income' ? 'green' : 'red'">{{
      transaction.type === 'income' ? 'Income' : 'Expense'
    }}</base-badge>
    <base-badge v-if="transaction.transferCardId" color="blue"
      >Transfer</base-badge
    >
  </div>
</template>
