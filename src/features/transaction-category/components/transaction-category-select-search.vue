<script setup>
import BaseSelectSearch from 'src/components/base/base-select-search.vue';
import { useRequest } from 'src/cores/request/request';
import { reactive, computed, ref } from 'vue';

const {
  loading: loadingFetch,
  request: fetchTransactionCategories,
  data: transactionCategories,
} = useRequest('/api/transaction-categories', {
  initData: {
    data: [],
  },
});
const { loading: loadingCreate, request: createTransactionCategory } =
  useRequest('/api/transaction-categories');

const selected = defineModel();

const visible = ref(false);
const loading = computed(() => loadingFetch.value || loadingCreate.value);
const params = reactive({
  limit: 10,
  search: null,
});

function loadTransactionCategories() {
  fetchTransactionCategories({
    params,
  });
}

function onFocused() {
  params.limit = 10;

  loadTransactionCategories();
}
function onSearch() {
  params.limit = 10;

  loadTransactionCategories();
}
function onLoadMore() {
  if (params.limit < transactionCategories.value.meta.total) {
    params.limit += 5;

    loadTransactionCategories();
  }
}
async function onCreate(name) {
  const res = await createTransactionCategory({
    method: 'post',
    data: {
      name,
    },
  });

  if (res.success) {
    selected.value = res.data;
    visible.value = false;
  }
}
</script>

<template>
  <base-select-search
    placeholder="Select Category"
    :options="transactionCategories.data"
    :loading="loading"
    with-create
    v-model="selected"
    v-model:visible="visible"
    v-model:search="params.search"
    @focused="onFocused"
    @search="onSearch"
    @end-scroll="onLoadMore"
    @create="onCreate"
  />
</template>
