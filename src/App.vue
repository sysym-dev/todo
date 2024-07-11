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

const createCardModalVisible = ref(false);
const createTransactionModalVisible = ref(false);

function onOpenCreateCardModal() {
  createCardModalVisible.value = true;
}
function onCloseCreateCardModal() {
  createCardModalVisible.value = false;
}
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
      <base-card title="Cards">
        <template #action>
          <base-button size="sm" @click="onOpenCreateCardModal"
            >New Card</base-button
          >
        </template>

        <div class="grid grid-cols-4 gap-4">
          <div class="border border-gray-200 text-gray-900 p-4 rounded-lg">
            <p class="font-bold text-lg">BCA</p>
            <p>1.680.000,00</p>
          </div>
          <div class="border border-gray-200 text-gray-900 p-4 rounded-lg">
            <p class="font-bold text-lg">Dana</p>
            <p>4.200,00</p>
          </div>
          <div class="border border-gray-200 text-gray-900 p-4 rounded-lg">
            <p class="font-bold text-lg">Dompet</p>
            <p>174.000,00</p>
          </div>
        </div>
      </base-card>
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
