<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseModal from 'src/components/base/base-modal.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import { X as CloseIcon } from '@vicons/tabler';
import { ref } from 'vue';
import { useRequest } from 'src/cores/request/request';
import { formatCurrency } from 'src/utils/number';

const {
  loading,
  request,
  data: cards,
  error,
} = useRequest('/api/cards', {
  initData: {
    balance: 0,
    income: 0,
    expense: 0,
  },
  initLoading: true,
});

const createCardModalVisible = ref(false);

function onOpenCreateCardModal() {
  createCardModalVisible.value = true;
}
function onCloseCreateCardModal() {
  createCardModalVisible.value = false;
}

request();
</script>

<template>
  <div>
    <base-card
      title="Cards"
      :title-loading="loading"
      :with-content="!loading"
      :error="!!error"
      :error-message="error"
    >
      <template v-if="!loading && !error" #action>
        <base-button size="sm" @click="onOpenCreateCardModal"
          >New Card</base-button
        >
      </template>

      <div class="grid grid-cols-4 gap-4">
        <div
          v-for="card in cards"
          :key="card.id"
          class="border border-gray-200 text-gray-900 p-4 rounded-lg"
        >
          <p class="font-bold text-lg">{{ card.name }}</p>
          <p>{{ formatCurrency(card.balance) }}</p>
        </div>
      </div>
    </base-card>

    <base-modal v-model="createCardModalVisible">
      <base-card title="New Card">
        <template #action>
          <base-button
            size="square"
            color="transparent"
            @click="onCloseCreateCardModal"
          >
            <close-icon class="w-4 h-4" />
          </base-button>
        </template>

        <base-form-item label="Name">
          <base-input id="name" placeholder="Name" />
        </base-form-item>

        <div class="space-x-2">
          <base-button> Save </base-button>
          <base-button color="transparent" @click="onCloseCreateCardModal">
            Cancel
          </base-button>
        </div>
      </base-card>
    </base-modal>
  </div>
</template>
