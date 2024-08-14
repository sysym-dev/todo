<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseModal from 'src/components/base/base-modal.vue';
import BaseInputFile from 'src/components/base/base-input-file.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import CardSelectSearch from 'src/features/card/components/card-select-search.vue';
import { X as CloseIcon } from '@vicons/tabler';
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
} = useRequest('/api/transactions/import');
const {
  validate,
  hasError,
  getError,
  resetError: resetErrorValidation,
} = useValidation(
  z.object({
    file: z.any(),
    card_id: z
      .number({
        invalid_type_error: 'card is required',
        required_error: 'card is required',
      })
      .positive({ message: 'card is required' }),
  }),
);

const form = reactive({
  file: null,
  card: null,
});

const visible = defineModel();

function onClose() {
  visible.value = false;
}
function onOpened() {
  resetErrorValidation();
  resetErrorRequest();

  form.file = null;
  form.card = null;
}
async function onSubmit() {
  const validation = await validate({
    file: form.file,
    card_id: form.card ? form.card.id : null,
  });

  if (validation.success) {
    const formData = new FormData();

    formData.append('file', validation.data.file);
    formData.append('card_id', validation.data.card_id);

    const res = await request({
      method: 'post',
      data: formData,
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
      title="Import Transaction"
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
          label="Upload File"
          :color="hasError('file') ? 'red' : 'default'"
          :message="getError('file')"
        >
          <base-input-file
            :color="hasError('file') ? 'red' : 'default'"
            v-model="form.file"
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
