<script setup>
import BaseSelectSearch from 'src/components/base/base-select-search.vue';
import { useRequest } from 'src/cores/request/request';

const { loading, request, data: cards } = useRequest('/api/cards');

const selected = defineModel();

function onFocused() {
  request();
}
</script>

<template>
  <base-select-search
    placeholder="Select Card"
    :options="cards"
    :loading="loading"
    v-model="selected"
    @focused="onFocused"
  />
</template>
