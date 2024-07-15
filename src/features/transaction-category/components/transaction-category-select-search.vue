<script setup>
import BaseSelectSearch from 'src/components/base/base-select-search.vue';
import { useRequest } from 'src/cores/request/request';
import { reactive } from 'vue';

const {
  loading,
  request,
  data: transactionCategories,
} = useRequest('/api/transaction-categories', {
  initData: {
    data: [],
  },
});

const selected = defineModel();
const params = reactive({
  limit: 10,
  search: null,
});

function loadCards() {
  request({
    params,
  });
}

function onFocused() {
  params.limit = 10;

  loadCards();
}
function onSearch() {
  params.limit = 10;

  loadCards();
}
function onLoadMore() {
  if (params.limit < transactionCategories.value.meta.total) {
    params.limit += 5;

    loadCards();
  }
}
</script>

<template>
  <base-select-search
    placeholder="Select Category"
    :options="transactionCategories.data"
    :loading="loading"
    v-model="selected"
    v-model:search="params.search"
    @focused="onFocused"
    @search="onSearch"
    @end-scroll="onLoadMore"
  />
</template>
