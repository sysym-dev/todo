<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseTable from 'src/components/base/base-table.vue';
import CardNewModal from 'src/features/card/components/card-new-modal.vue';
import CardEditModal from 'src/features/card/components/card-edit-modal.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseBadge from 'src/components/base/base-badge.vue';
import { ref, reactive, h } from 'vue';
import { useRequest } from 'src/cores/request/request';
import { formatCurrency } from 'src/utils/number';
import { formatDate } from 'src/utils/date';
import { Edit as EditIcon, Check as SetAsDefaultIcon } from '@vicons/tabler';
import { useAuthStore } from 'src/features/auth/auth.store';

const authStore = useAuthStore();
const {
  loading: loadingRead,
  request: requestRead,
  data: cards,
  error: errorRead,
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
const { loading: loadingUpdate, request: requestUpdate } =
  useRequest('/api/cards');

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
    render: ({ item }) =>
      h('div', { class: 'flex items-center space-x-2' }, [
        h('p', item.name),
        item.id === authStore.me.defaultCardId
          ? h(BaseBadge, { color: 'blue' }, { default: () => 'Default' })
          : null,
      ]),
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
      h('div', { class: 'space-x-1' }, [
        h(
          BaseButton,
          {
            title: 'Set as Default',
            size: 'square',
            onClick: () => onSetAsDefault(item),
          },
          { default: () => h(SetAsDefaultIcon, { class: 'w-4 h-4' }) },
        ),
        h(
          BaseButton,
          { title: 'Edit', size: 'square', onClick: () => onEdit(item) },
          { default: () => h(EditIcon, { class: 'w-4 h-4' }) },
        ),
      ]),
  },
];

function loadCards() {
  requestRead({
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
async function onSetAsDefault(card) {
  const res = await requestUpdate({
    url: `/api/me/default-card`,
    method: 'patch',
    data: {
      card_id: card.id,
    },
  });

  if (res.success) {
    authStore.loadMe();
  }
}

loadCards();
</script>

<template>
  <div>
    <base-card
      title="Cards"
      :title-loading="loadingRead || loadingUpdate"
      :with-content="requested || !loadingRead"
      :error="!!errorRead"
      :error-message="errorRead"
    >
      <template v-if="(requested || !loadingRead) && !errorRead" #action>
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
