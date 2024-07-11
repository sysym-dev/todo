<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseBadge from 'src/components/base/base-badge.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseModal from 'src/components/base/base-modal.vue';
import { X as CloseIcon } from '@vicons/tabler';
import { ref } from 'vue';

const createCardModalVisible = ref(false);

function onOpenCreateCardModal() {
  createCardModalVisible.value = true;
}
function onCloseCreateCardModal() {
  createCardModalVisible.value = false;
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center py-16">
    <div class="space-y-4 max-w-3xl w-full">
      <base-card title="Summary">
        <div class="grid grid-cols-3 gap-4">
          <div>
            <p class="font-bold text-xl text-gray-900">1.945.000,00</p>
            <p class="text-sm text-gray-600">Balance</p>
          </div>
          <div>
            <p class="font-bold text-xl text-gray-900">2.500.000,00</p>
            <p class="text-sm text-gray-600">Income</p>
          </div>
          <div>
            <p class="font-bold text-xl text-gray-900">645.000,00</p>
            <p class="text-sm text-gray-600">Expense</p>
          </div>
        </div>
      </base-card>
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

        <div class="space-y-2">
          <label for="name" class="text-gray-900">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            class="block w-full border border-gray-200 rounded-lg h-10 placeholder-gray-300 hover:border-gray-300 text-gray-900 focus:border-blue-600 focus:outline-0"
            placeholder="Name"
          />
        </div>

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
