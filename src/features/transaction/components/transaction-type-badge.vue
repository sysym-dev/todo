<script setup>
import BaseBadge from 'src/components/base/base-badge.vue';

defineProps({
  transaction: Object,
});
</script>

<template>
  <base-badge :color="transaction.type === 'income' ? 'green' : 'red'">{{
    transaction.type === 'income' ? 'Income' : 'Expense'
  }}</base-badge>
</template>
