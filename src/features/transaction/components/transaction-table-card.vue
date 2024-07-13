<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseBadge from 'src/components/base/base-badge.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseModal from 'src/components/base/base-modal.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseSelect from 'src/components/base/base-select.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import CardSelectSearch from 'src/features/card/components/card-select-search.vue';
import { X as CloseIcon } from '@vicons/tabler';
import { reactive, ref } from 'vue';
import { useRequest } from 'src/cores/request/request';
import { formatCurrency } from 'src/utils/number';
import { formatDate } from 'src/utils/date';
import { useValidation } from 'src/cores/validation/validation';

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
const { validate } = useValidation();

const form = reactive({
  type: 'income',
  card: null,
  amount: null,
});
const createTransactionModalVisible = ref(false);

function onOpenCreateTransactionModal() {
  createTransactionModalVisible.value = true;
}
function onCloseCreateTransactionModal() {
  createTransactionModalVisible.value = false;
}
function onOpened() {
  form.type = 'income';
  form.card = null;
  form.amount = null;
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

    <base-modal v-model="createTransactionModalVisible" @opened="onOpened">
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
          <base-select
            id="type"
            :options="[
              { id: 'income', name: 'Income' },
              { id: 'expense', name: 'Expense' },
            ]"
            v-model="form.type"
          />
        </base-form-item>

        <base-form-item label="Card">
          <card-select-search v-model="form.card" />
        </base-form-item>

        <base-form-item label="Amount">
          <base-input
            type="number"
            id="amount"
            placeholder="Amount"
            v-model="form.amount"
          />
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
