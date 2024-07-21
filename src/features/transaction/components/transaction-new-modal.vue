<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseModal from 'src/components/base/base-modal.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseLink from 'src/components/base/base-link.vue';
import BaseSelect from 'src/components/base/base-select.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import CardSelectSearch from 'src/features/card/components/card-select-search.vue';
import TransactionCategorySelectSearch from 'src/features/transaction-category/components/transaction-category-select-search.vue';
import TransactionItemsFormModal from './transaction-items-form-modal.vue';
import { X as CloseIcon, Plus as AddIcon } from '@vicons/tabler';
import { reactive, ref, inject, computed } from 'vue';
import { useRequest } from 'src/cores/request/request';
import { useValidation } from 'src/cores/validation/validation';
import { z } from 'zod';
import { formatCurrency } from 'src/utils/number';

const emit = defineEmits(['success']);

const emitter = inject('emitter');
const {
  loading,
  error,
  request,
  resetError: resetErrorRequest,
} = useRequest('/api/transactions');
const {
  validate,
  hasError,
  getError,
  resetError: resetErrorValidation,
} = useValidation(
  z.object({
    type: z.enum(['income', 'expense'], {
      invalid_type_error: 'invalid type',
      required_error: 'type is required',
    }),
    card_id: z
      .number({
        invalid_type_error: 'card is required',
        required_error: 'card is required',
      })
      .positive({ message: 'card is required' }),
    transaction_category_id: z
      .number({
        invalid_type_error: 'card is required',
        required_error: 'card is required',
      })
      .positive({ message: 'card is required' })
      .optional()
      .nullable(),
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
    items: z.any().array().nullable().optional(),
    date: z.coerce.date().max(new Date()).nullable().optional(),
  }),
);

const form = reactive({
  type: 'income',
  card: null,
  amount: null,
  description: null,
  category: null,
  items: [],
  date: null,
});
const inputs = reactive({
  category: false,
  description: false,
  date: false,
});
const itemsFormModalVisible = ref(false);

const visible = defineModel();
const itemAmount = computed(() =>
  form.items.reduce((total, item) => total + item.amount, 0),
);
const totalAmount = computed(() =>
  formatCurrency(itemAmount.value + form.amount),
);
const itemsDescription = computed(
  () => `${form.items.length} items (${formatCurrency(itemAmount.value)})`,
);

function onClose() {
  visible.value = false;
}
function onOpened() {
  resetErrorValidation();
  resetErrorRequest();

  form.type = 'income';
  form.card = null;
  form.amount = null;
  form.description = null;
  form.category = null;
  form.items = [];
  form.date = null;

  inputs.category = false;
  inputs.description = false;
  inputs.date = false;
}
async function onSubmit() {
  const validation = await validate({
    type: form.type,
    card_id: form.card ? form.card.id : null,
    transaction_category_id: form.category ? form.category.id : null,
    amount: form.amount,
    description: form.description,
    items: form.items
      ? form.items.map((item) => ({
          transaction_category_id: item.category ? item.category.id : null,
          amount: item.amount,
          description: item.description,
        }))
      : null,
    date: form.date,
  });

  if (validation.success) {
    const res = await request({
      method: 'post',
      data: validation.data,
    });

    if (res.success) {
      visible.value = false;

      emitter.emit('transaction-created');
      emit('success');
    }
  }
}
function onOpenItemsFormModal() {
  itemsFormModalVisible.value = true;
}
function onItemsSaved(value) {
  form.items = value;
}
function onAddInput(key) {
  inputs[key] = true;
}
function onRemoveInput(key) {
  inputs[key] = false;
  form[key] = null;
}
</script>

<template>
  <base-modal v-model="visible" @opened="onOpened">
    <base-card
      title="New Transaction"
      :error="!!error"
      :error-message="error"
      :error-block="false"
    >
      <template #action>
        <base-button size="square" color="transparent" @click="onClose">
          <close-icon class="w-4 h-4" />
        </base-button>
      </template>

      <form class="space-y-4" @submit.prevent="onSubmit">
        <base-form-item
          label="Type"
          :color="hasError('type') ? 'red' : 'default'"
          :message="getError('type')"
        >
          <base-select
            id="type"
            :options="[
              { id: 'income', name: 'Income' },
              { id: 'expense', name: 'Expense' },
            ]"
            :color="hasError('type') ? 'red' : 'default'"
            v-model="form.type"
          />
        </base-form-item>

        <base-form-item
          label="Card"
          :color="hasError('card_id') ? 'red' : 'default'"
          :message="getError('card_id')"
        >
          <card-select-search
            :color="hasError('card_id') ? 'red' : 'default'"
            v-model="form.card"
          />
        </base-form-item>

        <base-form-item
          v-if="inputs.category"
          label="Category"
          :color="hasError('transaction_category_id') ? 'red' : 'default'"
          :message="getError('transaction_category_id')"
        >
          <template #label-append>
            <base-button
              size="square"
              color="transparent"
              @click="onRemoveInput('category')"
            >
              <close-icon class="w-4 h-4" />
            </base-button>
          </template>
          <transaction-category-select-search
            :color="hasError('transaction_category_id') ? 'red' : 'default'"
            v-model="form.category"
          />
        </base-form-item>

        <base-form-item
          v-if="inputs.date"
          label="Date"
          :color="hasError('date') ? 'red' : 'default'"
          :message="getError('date')"
        >
          <template #label-append>
            <base-button
              size="square"
              color="transparent"
              @click="onRemoveInput('date')"
            >
              <close-icon class="w-4 h-4" />
            </base-button>
          </template>
          <base-input
            id="date"
            type="date"
            placeholder="Date"
            :color="hasError('date') ? 'red' : 'default'"
            v-model="form.date"
          />
        </base-form-item>

        <base-form-item
          v-if="inputs.description"
          label="Description"
          :color="hasError('description') ? 'red' : 'default'"
          :message="getError('description')"
        >
          <template #label-append>
            <base-button
              size="square"
              color="transparent"
              @click="onRemoveInput('description')"
            >
              <close-icon class="w-4 h-4" />
            </base-button>
          </template>
          <base-input
            id="description"
            placeholder="Description"
            :color="hasError('description') ? 'red' : 'default'"
            v-model="form.description"
          />
        </base-form-item>

        <base-form-item
          label="Amount"
          :color="hasError('amount') ? 'red' : 'default'"
          :message="getError('amount')"
        >
          <base-input
            type="number"
            id="amount"
            placeholder="Amount"
            :color="hasError('amount') ? 'red' : 'default'"
            v-model="form.amount"
          />
        </base-form-item>

        <template v-if="form.items.length">
          <base-form-item label="Items">
            <template #label-append>
              <base-link href="#" @click="onOpenItemsFormModal">
                Add Items
              </base-link>
            </template>
            <base-input
              id="items"
              placeholder="Items"
              disabled
              v-model="itemsDescription"
            />
          </base-form-item>

          <base-form-item label="Total Amount">
            <base-input
              id="total_amount"
              placeholder="Total Amount"
              disabled
              v-model="totalAmount"
            />
          </base-form-item>
        </template>

        <div class="space-x-2">
          <base-button
            v-if="!inputs.category"
            color="transparent-bordered"
            size="sm"
            @click="onAddInput('category')"
          >
            <add-icon class="w-4 h-4" />
            Category
          </base-button>
          <base-button
            v-if="!form.items.length"
            color="transparent-bordered"
            size="sm"
            @click="onOpenItemsFormModal"
          >
            <add-icon class="w-4 h-4" />
            Items
          </base-button>
          <base-button
            v-if="!inputs.description"
            color="transparent-bordered"
            size="sm"
            @click="onAddInput('description')"
          >
            <add-icon class="w-4 h-4" />
            Description
          </base-button>
          <base-button
            v-if="!inputs.date"
            color="transparent-bordered"
            size="sm"
            @click="onAddInput('date')"
          >
            <add-icon class="w-4 h-4" />
            Date
          </base-button>
        </div>

        <div class="space-x-2">
          <base-button type="submit" :loading="loading"> Save </base-button>
          <base-button color="transparent" @click="onClose">
            Cancel
          </base-button>
        </div>
      </form>
    </base-card>

    <transaction-items-form-modal
      :items="form.items"
      v-model="itemsFormModalVisible"
      @saved="onItemsSaved"
    />
  </base-modal>
</template>
