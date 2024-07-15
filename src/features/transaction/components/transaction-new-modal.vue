<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseModal from 'src/components/base/base-modal.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseSelect from 'src/components/base/base-select.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import CardSelectSearch from 'src/features/card/components/card-select-search.vue';
import { X as CloseIcon } from '@vicons/tabler';
import { reactive } from 'vue';
import { useRequest } from 'src/cores/request/request';
import { useValidation } from 'src/cores/validation/validation';
import { z } from 'zod';
import { inject } from 'vue';

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
  }),
);

const form = reactive({
  type: 'income',
  card: null,
  amount: null,
  description: null,
});
const visible = defineModel();

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
}
async function onSubmit() {
  const validation = await validate({
    type: form.type,
    card_id: form.card ? form.card.id : null,
    amount: form.amount,
    description: form.description,
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

        <base-form-item
          label="Description"
          :color="hasError('description') ? 'red' : 'default'"
          :message="getError('description')"
        >
          <base-input
            textarea
            id="description"
            placeholder="Description"
            :color="hasError('description') ? 'red' : 'default'"
            v-model="form.description"
          />
        </base-form-item>

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
