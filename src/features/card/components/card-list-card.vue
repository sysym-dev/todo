<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseButton from 'src/components/base/base-button.vue';
import CardNewModal from './card-new-modal.vue';
import { ref } from 'vue';
import { useRequest } from 'src/cores/request/request';
import { formatCurrency } from 'src/utils/number';

const {
  loading,
  request,
  data: cards,
  error,
  requested,
} = useRequest('/api/cards', {
  initLoading: true,
  initData: {
    data: [],
  },
});

const createModalVisible = ref(false);

function loadCards() {
  request({
    params: {
      limit: 4,
    },
  });
}

function onOpenCreateModal() {
  createModalVisible.value = true;
}
function onSuccessCreate() {
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

      <div class="grid grid-cols-4 gap-4">
        <div
          v-for="card in cards.data"
          :key="card.id"
          class="border border-gray-200 text-gray-900 p-4 rounded-lg"
        >
          <p class="font-bold text-lg">{{ card.name }}</p>
          <p>{{ formatCurrency(card.balance) }}</p>
        </div>
      </div>
    </base-card>

    <card-new-modal v-model="createModalVisible" @success="onSuccessCreate" />
  </div>
</template>
