<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseModal from 'src/components/base/base-modal.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import CardSelectSearch from 'src/features/card/components/card-select-search.vue';
import TransactionCategorySelectSearch from 'src/features/transaction-category/components/transaction-category-select-search.vue';
import { X as CloseIcon, Plus as AddIcon } from '@vicons/tabler';
import { reactive, inject } from 'vue';
import { useRequest } from 'src/cores/request/request';
import { useValidation } from 'src/cores/validation/validation';
import { z } from 'zod';

const emit = defineEmits(['success']);

const emitter = inject('emitter');
const {
  loading,
  error,
  request,
  resetError: resetErrorRequest,
} = useRequest('/api/transactions/transfer');
const {
  validate,
  hasError,
  getError,
  resetError: resetErrorValidation,
} = useValidation(
  z.object({
    source_card_id: z
      .number({
        invalid_type_error: 'source card is required',
        required_error: 'source card is required',
      })
      .positive({ message: 'source card is required' }),
    target_card_id: z
      .number({
        invalid_type_error: 'target card is required',
        required_error: 'target card is required',
      })
      .positive({ message: 'target card is required' }),
    transaction_category_id: z
      .number({
        invalid_type_error: 'category is required',
        required_error: 'category is required',
      })
      .positive({ message: 'category is required' })
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
    date: z.coerce.date().max(new Date()).nullable().optional(),
  }),
);

const form = reactive({
  sourceCard: null,
  targetCard: null,
  amount: null,
  description: null,
  category: null,
  date: null,
});
const inputs = reactive({
  category: false,
  description: false,
  date: false,
});

const visible = defineModel();

function onClose() {
  visible.value = false;
}
function onOpened() {
  resetErrorValidation();
  resetErrorRequest();

  form.sourceCard = null;
  form.targetCard = null;
  form.amount = null;
  form.description = null;
  form.category = null;
  form.date = null;

  inputs.category = false;
  inputs.description = false;
  inputs.date = false;
}
async function onSubmit() {
  const validation = await validate({
    source_card_id: form.sourceCard ? form.sourceCard.id : null,
    target_card_id: form.targetCard ? form.targetCard.id : null,
    transaction_category_id: form.category ? form.category.id : null,
    amount: form.amount,
    description: form.description,
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
      title="Transfer Balance"
      :error="!!error"
      :error-message="error"
      :error-block="false"
      :mobile-action-col="false"
    >
      <template #action>
        <base-button size="square" color="transparent" @click="onClose">
          <close-icon class="w-4 h-4" />
        </base-button>
      </template>

      <form class="space-y-4" @submit.prevent="onSubmit">
        <base-form-item
          label="Source Card"
          :color="hasError('source_card_id') ? 'red' : 'default'"
          :message="getError('source_card_id')"
        >
          <card-select-search
            :color="hasError('source_card_id') ? 'red' : 'default'"
            v-model="form.sourceCard"
          />
        </base-form-item>

        <base-form-item
          label="Target Card"
          :color="hasError('target_card_id') ? 'red' : 'default'"
          :message="getError('target_card_id')"
        >
          <card-select-search
            :color="hasError('target_card_id') ? 'red' : 'default'"
            v-model="form.targetCard"
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
  </base-modal>
</template>
