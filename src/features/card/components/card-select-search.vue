<script setup>
import BaseSelectSearch from 'src/components/base/base-select-search.vue';
import { useRequest } from 'src/cores/request/request';
import { reactive } from 'vue';

const {
  loading,
  request,
  data: cards,
} = useRequest('/api/cards', {
  initData: [],
});

const selected = defineModel();
const params = reactive({
  limit: 5,
  search: null,
});

function loadCards() {
  request({
    params,
  });
}

function onFocused() {
  params.limit = 5;

  loadCards();
}
function onSearch(q) {
  params.limit = 5;

  loadCards();
}
function onLoadMore() {
  params.limit += 5;

  loadCards();
}
</script>

<template>
  <base-select-search
    placeholder="Select Card"
    :options="cards"
    :loading="loading"
    v-model="selected"
    v-model:search="params.search"
    @focused="onFocused"
    @search="onSearch"
    @end-scroll="onLoadMore"
  />
</template>
