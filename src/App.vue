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
import SummaryCard from 'src/features/summary/components/summary-card.vue';
import CardListCard from 'src/features/card/components/card-list-card.vue';

const createTransactionModalVisible = ref(false);

function onOpenCreateTransactionModal() {
  createTransactionModalVisible.value = true;
}
function onCloseCreateTransactionModal() {
  createTransactionModalVisible.value = false;
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center py-16">
    <div class="space-y-4 max-w-3xl w-full">
      <summary-card />
      <card-list-card />
      <base-card title="Transactions">
        <template #action>
          <base-button size="sm" @click="onOpenCreateTransactionModal"
            >New Transaction</base-button
          >
        </template>

        <table
          class="w-full border rounded-lg border-separate border-spacing-0"
        >
          <thead>
            <tr>
              <th class="text-left border-b text-gray-900 py-2 px-3">Date</th>
              <th class="text-left border-b text-gray-900 py-2 px-3">Type</th>
              <th class="text-left border-b text-gray-900 py-2 px-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border-b text-gray-900 py-2 px-3">2024/07/09</td>
              <td class="border-b text-gray-900 py-2 px-3">
                <base-badge color="red">Expense</base-badge>
              </td>
              <td class="border-b text-gray-900 py-2 px-3">40.000,00</td>
            </tr>
            <tr>
              <td class="border-b text-gray-900 py-2 px-3">2024/07/09</td>
              <td class="border-b text-gray-900 py-2 px-3">
                <base-badge color="red">Expense</base-badge>
              </td>
              <td class="border-b text-gray-900 py-2 px-3">14.000,00</td>
            </tr>
            <tr>
              <td class="border-b text-gray-900 py-2 px-3">2024/07/09</td>
              <td class="border-b text-gray-900 py-2 px-3">
                <base-badge color="red">Expense</base-badge>
              </td>
              <td class="border-b text-gray-900 py-2 px-3">14.000,00</td>
            </tr>
            <tr>
              <td class="text-gray-900 py-2 px-3">2024/07/09</td>
              <td class="border-b text-gray-900 py-2 px-3">
                <base-badge color="red">Expense</base-badge>
              </td>
              <td class="text-gray-900 py-2 px-3">46.000,00</td>
            </tr>
          </tbody>
        </table>
      </base-card>
    </div>

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
