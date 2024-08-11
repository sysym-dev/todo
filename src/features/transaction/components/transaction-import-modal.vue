<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseModal from 'src/components/base/base-modal.vue';
import BaseInputFile from 'src/components/base/base-input-file.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
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
  }),
);

const form = reactive({
  file: null,
});

const visible = defineModel();

function onClose() {
  visible.value = false;
}
function onOpened() {
  resetErrorValidation();
  resetErrorRequest();

  form.file = null;
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
