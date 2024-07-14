<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseTable from 'src/components/base/base-table.vue';
import CardNewModal from 'src/features/card/components/card-new-modal.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { ref, reactive } from 'vue';
import { useRequest } from 'src/cores/request/request';
import { formatCurrency } from 'src/utils/number';
import { formatDate } from 'src/utils/date';

const {
  loading,
  request,
  data: cards,
  error,
  requested,
} = useRequest('/api/cards', {
  initLoading: true,
  initData: {
    meta: {
      total: 0,
    },
    data: [],
  },
});

const params = reactive({
  limit: 10,
  page: 1,
});
const createModalVisible = ref(false);

const columns = [
  {
    key: 'name',
    name: 'Name',
  },
  {
    key: 'balance',
    name: 'Balance',
    value: (item) => formatCurrency(item.balance),
  },
  {
    key: 'updatedAt',
    name: 'Last Updated',
    value: (item) => formatDate(item.createdAt, 'DD MMMM YYYY HH:mm'),
  },
  {
    key: 'createdAt',
    name: 'Created At',
    value: (item) => formatDate(item.createdAt, 'DD MMMM YYYY HH:mm'),
  },
];

function loadCards() {
  request({
    params,
  });
}

function onOpenCreateModal() {
  createModalVisible.value = true;
}
function onSuccessCreate() {
  params.page = 1;
  loadCards();
}
function onChangePage() {
  loadCards();
}

loadCards();
</script>

<template>
  <div>
    <base-card
      title="Cards"
      :title-loading="loading"
      :with-content="requested || !loading"
      :error="!!error"
      :error-message="error"
    >
      <template v-if="(requested || !loading) && !error" #action>
        <base-button size="sm" @click="onOpenCreateModal">New Card</base-button>
      </template>

      <base-table
        :columns="columns"
        :data="cards.data"
        :meta="cards.meta"
        v-model:page="params.page"
        @change-page="onChangePage"
      ></base-table>
    </base-card>

    <card-new-modal v-model="createModalVisible" @success="onSuccessCreate" />
  </div>
</template>
