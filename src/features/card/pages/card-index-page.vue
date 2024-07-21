<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseTable from 'src/components/base/base-table.vue';
import CardNewModal from 'src/features/card/components/card-new-modal.vue';
import CardEditModal from 'src/features/card/components/card-edit-modal.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { ref, reactive, h } from 'vue';
import { useRequest } from 'src/cores/request/request';
import { formatCurrency } from 'src/utils/number';
import { formatDate } from 'src/utils/date';
import { Edit as EditIcon } from '@vicons/tabler';

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
const editModal = reactive({
  visible: false,
  card: null,
});

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
  {
    key: 'actions',
    name: 'Actions',
    render: ({ item }) =>
      h(
        BaseButton,
        { size: 'square', onClick: () => onEdit(item) },
        { default: () => h(EditIcon, { class: 'w-4 h-4' }) },
      ),
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
function onSuccessEdit() {
  params.page = 1;
  loadCards();
}
function onChangePage() {
  loadCards();
}
function onEdit(card) {
  editModal.card = { ...card };
  editModal.visible = true;
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
    <card-edit-modal
      :card="editModal.card"
      v-model="editModal.visible"
      @success="onSuccessEdit"
    />
  </div>
</template>
