<script setup>
import BaseModal from 'src/components/base/base-modal.vue';
import BaseCard from 'src/components/base/base-card.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { useRequest } from 'src/cores/request/request';
import { inject } from 'vue';

const props = defineProps({
  card: Object,
});
const emit = defineEmits(['success']);

const emitter = inject('emitter');
const { loading, request } = useRequest('/api/cards');

const visible = defineModel();

function onCancel() {
  visible.value = false;
}
async function onConfirm() {
  const res = await request({
    url: `/api/cards/${props.card.id}`,
    method: 'delete',
  });

  if (!res.success) {
    emitter.emit('create-toast', {
      message: res.error,
    });
  } else {
    emit('success');
    visible.value = false;
  }
}
</script>

<template>
  <base-modal v-model="visible">
    <base-card title="Confirm Delete Card" :shadow="false">
      <p class="text-gray-500">Are you sure want to delete this card?</p>
      <div class="space-x-2">
        <base-button color="red" :loading="loading" @click="onConfirm"
          >Yes, Delete</base-button
        >
        <base-button color="transparent" @click="onCancel">Cancel</base-button>
      </div>
    </base-card>
  </base-modal>
</template>
