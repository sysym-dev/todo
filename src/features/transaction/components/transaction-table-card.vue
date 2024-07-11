<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseBadge from 'src/components/base/base-badge.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseModal from 'src/components/base/base-modal.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseSelect from 'src/components/base/base-select.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import { X as CloseIcon } from '@vicons/tabler';
import { ref } from 'vue';
import { useRequest } from 'src/cores/request/request';
import { formatCurrency } from 'src/utils/number';
import { formatDate } from 'src/utils/date';

const {
  loading,
  request,
  data: transactions,
  error,
} = useRequest('/api/transactions', {
  initData: {
    balance: 0,
    income: 0,
    expense: 0,
  },
  initLoading: true,
});

const createTransactionModalVisible = ref(false);

function onOpenCreateTransactionModal() {
  createTransactionModalVisible.value = true;
}
function onCloseCreateTransactionModal() {
  createTransactionModalVisible.value = false;
}

request();
</script>

<template>
  <div>
    <base-card
      title="Transactions"
      :title-loading="loading"
      :with-content="!loading"
      :error="!!error"
      :error-message="error"
    >
      <template v-if="!loading && !error" #action>
        <base-button size="sm" @click="onOpenCreateTransactionModal"
          >New Transaction</base-button
        >
      </template>

      <table class="w-full border rounded-lg border-separate border-spacing-0">
        <thead>
          <tr>
            <th class="text-left border-b text-gray-900 py-2 px-3">Date</th>
            <th class="text-left border-b text-gray-900 py-2 px-3">Type</th>
            <th class="text-left border-b text-gray-900 py-2 px-3">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td class="border-b text-gray-900 py-2 px-3">
              {{ formatDate(transaction.createdAt, 'YYYY/MM/DD') }}
            </td>
            <td class="border-b text-gray-900 py-2 px-3">
              <base-badge color="red">{{ transaction.type }}</base-badge>
            </td>
            <td class="border-b text-gray-900 py-2 px-3">
              {{ formatCurrency(transaction.amount) }}
            </td>
          </tr>
        </tbody>
      </table>
    </base-card>

    <base-modal v-model="createTransactionModalVisible">
      <base-card title="New Transaction">
        <template #action>
          <base-button
            size="square"
            color="transparent"
            @click="onCloseCreateTransactionModal"
          >
            <close-icon class="w-4 h-4" />
          </base-button>
        </template>

        <base-form-item label="Type">
          <base-select id="type" />
        </base-form-item>

        <base-form-item label="Card">
          <base-select id="card" />
        </base-form-item>

        <base-form-item label="Amount">
          <base-input type="number" id="amount" placeholder="Amount" />
        </base-form-item>

        <div class="space-x-2">
          <base-button> Save </base-button>
          <base-button
            color="transparent"
            @click="onCloseCreateTransactionModal"
          >
            Cancel
          </base-button>
        </div>
      </base-card>
    </base-modal>
  </div>
</template>
