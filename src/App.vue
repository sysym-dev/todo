<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseBadge from 'src/components/base/base-badge.vue';
</script>

<template>
  <div class="h-screen bg-gray-100 flex flex-col items-center justify-center">
    <div class="space-y-4 max-w-3xl w-full">
      <base-card title="Cards">
        <div class="grid grid-cols-4 gap-x-4">
          <div class="border border-gray-200 text-gray-900 p-4 rounded-lg">
            <p class="font-bold text-lg">BCA</p>
            <p>Rp 1.680.000,00</p>
          </div>
          <div class="border border-gray-200 text-gray-900 p-4 rounded-lg">
            <p class="font-bold text-lg">Dana</p>
            <p>Rp 4.200,00</p>
          </div>
          <div class="border border-gray-200 text-gray-900 p-4 rounded-lg">
            <p class="font-bold text-lg">Dompet</p>
            <p>Rp 174.000,00</p>
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
              <td class="border-b text-gray-900 py-2 px-3">40000</td>
            </tr>
            <tr>
              <td class="border-b text-gray-900 py-2 px-3">2024/07/09</td>
              <td class="border-b text-gray-900 py-2 px-3">
                <base-badge color="red">Expense</base-badge>
              </td>
              <td class="border-b text-gray-900 py-2 px-3">14000</td>
            </tr>
            <tr>
              <td class="border-b text-gray-900 py-2 px-3">2024/07/09</td>
              <td class="border-b text-gray-900 py-2 px-3">
                <base-badge color="red">Expense</base-badge>
              </td>
              <td class="border-b text-gray-900 py-2 px-3">14000</td>
            </tr>
            <tr>
              <td class="text-gray-900 py-2 px-3">2024/07/09</td>
              <td class="border-b text-gray-900 py-2 px-3">
                <base-badge color="red">Expense</base-badge>
              </td>
              <td class="text-gray-900 py-2 px-3">46000</td>
            </tr>
          </tbody>
        </table>
      </base-card>
    </div>
  </div>
</template>
