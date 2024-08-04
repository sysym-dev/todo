<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseModal from 'src/components/base/base-modal.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import CardSelectSearch from 'src/features/card/components/card-select-search.vue';
import { X as CloseIcon, Plus as AddIcon } from '@vicons/tabler';
import { useRequest } from 'src/cores/request/request';
import { useValidation } from 'src/cores/validation/validation';
import { reactive } from 'vue';
import { z } from 'zod';

const emit = defineEmits(['success']);

const {
  loading,
  request,
  error,
  resetError: resetRequestError,
} = useRequest('/api/cards');
const {
  validate,
  hasError,
  getError,
  resetError: resetValidationError,
} = useValidation(
  z.object({
    name: z
      .string({
        invalid_type_error: 'name must be a string',
        required_error: 'name is required',
      })
      .min(1, { message: 'name is required' }),
    source_card_id: z
      .number({
        invalid_type_error: 'card must be a number',
      })
      .positive({ message: 'card is required' })
      .optional()
      .nullable(),
    initial_balance: z
      .number({
        invalid_type_error: 'initial_balance must be a number',
        required_error: 'initial_balance is required',
      })
      .positive({ message: 'initial_balance must be positive' })
      .optional()
      .nullable(),
  }),
);

const visible = defineModel();
const form = reactive({
  name: null,
  source_card: null,
  initial_balance: null,
});
const inputs = reactive({
  source_card: false,
  initial_balance: false,
});

function onClose() {
  visible.value = false;
}
function onOpened() {
  resetValidationError();
  resetRequestError();

  form.name = null;
  form.source_card = null;
  form.initial_balance = null;

  inputs.source_card = null;
  inputs.initial_balance = null;
}
async function onSubmit() {
  const validation = await validate(form);

  if (validation.success) {
    const res = await request({
      method: 'post',
      data: validation.data,
    });

    if (res.success) {
      visible.value = false;

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
      title="New Card"
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
          label="Name"
          :color="hasError('name') ? 'red' : 'default'"
          :message="getError('name')"
        >
          <base-input
            id="name"
            placeholder="Name"
            :color="hasError('name') ? 'red' : 'default'"
            v-model="form.name"
          />
        </base-form-item>

        <base-form-item
          v-if="inputs.source_card"
          label="Source Card"
          :color="hasError('source_card_id') ? 'red' : 'default'"
          :message="getError('source_card_id')"
        >
          <template #label-append>
            <base-button
              size="square"
              color="transparent"
              @click="onRemoveInput('source_card')"
            >
              <close-icon class="w-4 h-4" />
            </base-button>
          </template>
          <card-select-search
            :color="hasError('source_card_id') ? 'red' : 'default'"
            v-model="form.source_card"
          />
        </base-form-item>

        <base-form-item
          v-if="inputs.initial_balance"
          label="Initial Balance"
          :color="hasError('initial_balance') ? 'red' : 'default'"
          :message="getError('initial_balance')"
        >
          <template #label-append>
            <base-button
              size="square"
              color="transparent"
              @click="onRemoveInput('initial_balance')"
            >
              <close-icon class="w-4 h-4" />
            </base-button>
          </template>
          <base-input
            id="initial_balance"
            type="number"
            placeholder="Initial Balance"
            :color="hasError('initial_balance') ? 'red' : 'default'"
            v-model="form.initial_balance"
          />
        </base-form-item>

        <div class="space-x-2">
          <base-button
            v-if="!inputs.source_card"
            color="transparent-bordered"
            size="sm"
            @click="onAddInput('source_card')"
          >
            <add-icon class="w-4 h-4" />
            Add Source Card
          </base-button>
          <base-button
            v-if="!inputs.initial_balance"
            color="transparent-bordered"
            size="sm"
            @click="onAddInput('initial_balance')"
          >
            <add-icon class="w-4 h-4" />
            Add Initial Balance
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
