<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseModal from 'src/components/base/base-modal.vue';
import BaseTable from 'src/components/base/base-table.vue';
import BaseButton from 'src/components/base/base-button.vue';
import TransactionCategorySelectSearch from 'src/features/transaction-category/components/transaction-category-select-search.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseLink from 'src/components/base/base-link.vue';
import { ref, computed } from 'vue';
import { X as CloseIcon } from '@vicons/tabler';
import { useValidation } from 'src/cores/validation/validation';
import { z } from 'zod';

const props = defineProps({
  items: [Array, null],
});
const emit = defineEmits(['saved']);

const { error, validate, resetError } = useValidation(
  z
    .object({
      category: z.any().optional().nullable(),
      amount: z
        .number({
          invalid_type_error: 'amount must be a number',
          required_error: 'amount is required',
        })
        .positive({ message: 'amount must be positive' }),
      description: z
        .string({
          invalid_type_error: 'description must be a string',
        })
        .nullable()
        .optional(),
    })
    .array(),
);

const visible = defineModel();
const itemsInput = ref([
  {
    category: null,
    amount: null,
    description: null,
  },
]);

const totalAmount = computed(() =>
  itemsInput.value.reduce((total, item) => total + item.amount, 0),
);

const columns = [
  {
    key: 'category',
    name: 'Category',
  },
  {
    key: 'amount',
    name: 'Amount',
  },
  {
    key: 'description',
    name: 'Description',
  },
  {
    key: 'action',
    name: 'Action',
    thClasses: 'text-center',
  },
];

function onAddItem() {
  itemsInput.value.push({
    category: null,
    amount: null,
    description: null,
  });
}
function onRemoveItem(index) {
  itemsInput.value.splice(index, 1);
}
function onClose() {
  visible.value = false;
}
async function onSave() {
  const validation = await validate(
    itemsInput.value.map((item) => ({
      category: item.category,
      amount: item.amount,
      description: item.description,
    })),
  );

  if (validation.success) {
    emit('saved', validation.data);

    visible.value = false;
  }
}
function onOpened() {
  resetError();

  if (Array.isArray(props.items) && props.items.length) {
    itemsInput.value = props.items.map((item) => ({
      category: item.category,
      amount: item.amount,
      description: item.description,
    }));
  } else {
    itemsInput.value = [
      {
        category: null,
        amount: null,
        description: null,
      },
    ];
  }
}
</script>

<template>
  <base-modal width="4xl" v-model="visible" @opened="onOpened">
    <base-card
      title="Add Items"
      :error="!!error.length"
      :error-message="error.length ? error[0].message : ''"
      :error-block="false"
    >
      <template #action>
        <base-button size="square" color="transparent" @click="onClose">
          <close-icon class="w-4 h-4" />
        </base-button>
      </template>
      <base-table
        :columns="columns"
        :data="itemsInput"
        :meta="{ total: itemsInput.length }"
        :with-pagination="false"
      >
        <template #body="{ tdClasses }">
          <tr v-for="(item, index) in itemsInput" :key="index">
            <td
              :class="[
                tdClasses,
                'py-4',
                index !== itemsInput.length - 1 ? 'border-b' : '',
              ]"
            >
              <transaction-category-select-search
                v-model="itemsInput[index].category"
              />
            </td>
            <td
              :class="[
                tdClasses,
                'py-4',
                index !== itemsInput.length - 1 ? 'border-b' : '',
              ]"
            >
              <base-input
                placeholder="Amount"
                type="number"
                v-model="itemsInput[index].amount"
              />
            </td>
            <td
              :class="[
                tdClasses,
                'py-4',
                index !== itemsInput.length - 1 ? 'border-b' : '',
              ]"
            >
              <base-input
                placeholder="Description"
                v-model="itemsInput[index].description"
              />
            </td>
            <td
              :class="[
                tdClasses,
                'py-4 text-center',
                index !== itemsInput.length - 1 ? 'border-b' : '',
              ]"
            >
              <base-button
                size="square"
                color="transparent-red"
                @click="onRemoveItem(index)"
              >
                <close-icon class="w-4 h-4" />
              </base-button>
            </td>
          </tr>
        </template>
      </base-table>
      <div class="flex items-start justify-between">
        <base-link href="#" @click="onAddItem">+ Add Items</base-link>
        <div class="flex gap-x-4">
          <p class="text-gray-600">Total</p>
          <p class="font-bold text-gray-900">{{ totalAmount }}</p>
        </div>
      </div>

      <template #footer>
        <div class="flex gap-x-2">
          <base-button type="submit" @click="onSave"> Save </base-button>
          <base-button color="transparent" @click="onClose">
            Cancel
          </base-button>
        </div>
      </template>
    </base-card>
  </base-modal>
</template>
