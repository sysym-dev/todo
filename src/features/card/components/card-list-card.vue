<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseBadge from 'src/components/base/base-badge.vue';
import CardNewModal from './card-new-modal.vue';
import { ref } from 'vue';
import { useRequest } from 'src/cores/request/request';
import { formatCurrency } from 'src/utils/number';
import { inject, onUnmounted } from 'vue';
import { useAuthStore } from 'src/features/auth/auth.store';

const emitter = inject('emitter');
const authStore = useAuthStore();
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

function onTransactionCreated() {
  loadCards();
}

emitter.on('transaction-created', onTransactionCreated);

onUnmounted(() => {
  emitter.off('transaction-created', onTransactionCreated);
});

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
        <div class="space-x-2">
          <base-button
            v-if="cards.meta.total > 4"
            size="sm"
            color="transparent-bordered"
            tag="router-link"
            :to="{ name: 'card.index' }"
            >View All Card</base-button
          >
          <base-button size="sm" @click="onOpenCreateModal"
            >New Card</base-button
          >
        </div>
      </template>

      <p v-if="!cards.meta.total" class="text-gray-600">No Cards Exists</p>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="card in cards.data"
          :key="card.id"
          class="border border-gray-200 text-gray-900 p-4 rounded-lg"
        >
          <div class="flex items-center justify-between">
            <p class="font-bold text-base">{{ card.name }}</p>
            <base-badge
              v-if="card.id === authStore.me.defaultCardId"
              color="blue"
              >Default</base-badge
            >
          </div>
          <p>{{ formatCurrency(card.balance) }}</p>
        </div>
      </div>
    </base-card>

    <card-new-modal v-model="createModalVisible" @success="onSuccessCreate" />
  </div>
</template>
