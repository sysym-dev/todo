<script setup>
import BaseSelectSearch from 'src/components/base/base-select-search.vue';
import { useRequest } from 'src/cores/request/request';

const { loading, request, data: cards } = useRequest('/api/cards');

const selected = defineModel();

function onFocused(q) {
  request({
    params: {
      search: q,
    },
  });
}
function onSearch(q) {
  request({
    params: {
      search: q,
    },
  });
}
</script>

<template>
  <base-select-search
    placeholder="Select Card"
    :options="cards"
    :loading="loading"
    v-model="selected"
    @focused="onFocused"
    @search="onSearch"
  />
</template>
