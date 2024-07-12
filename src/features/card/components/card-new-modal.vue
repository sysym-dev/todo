<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseModal from 'src/components/base/base-modal.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import { X as CloseIcon } from '@vicons/tabler';
import { useRequest } from 'src/cores/request/request';
import { useValidation } from 'src/cores/validation/validation';
import { reactive } from 'vue';
import { z } from 'zod';

const {
  loading,
  request,
  data: cards,
  error: errorRequest,
} = useRequest('/api/cards', {
  initData: {
    balance: 0,
    income: 0,
    expense: 0,
  },
  initLoading: true,
});
const { validate, hasError, getError, resetError } = useValidation(
  z.object({
    name: z
      .string({
        invalid_type_error: 'name must be a string',
        required_error: 'name is required',
      })
      .min(1, { message: 'name is required' }),
  }),
);

const visible = defineModel();
const form = reactive({
  name: null,
});

function onClose() {
  visible.value = false;
}
function onOpened() {
  resetError();

  form.name = null;
}
async function onSubmit() {
  await validate(form);
}

request();
</script>

<template>
  <base-modal v-model="visible" @opened="onOpened">
    <base-card title="New Card">
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

        <div class="space-x-2">
          <base-button type="submit"> Save </base-button>
          <base-button color="transparent" @click="onClose">
            Cancel
          </base-button>
        </div>
      </form>
    </base-card>
  </base-modal>
</template>
