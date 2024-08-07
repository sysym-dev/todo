<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseButton from 'src/components/base/base-button.vue';
</script>

<template>
  <div class="max-w-sm mx-auto w-full">
    <base-card title="Setup New User">
      <base-form-item label="User Name">
        <base-input placeholder="User Name" />
      </base-form-item>
      <base-form-item label="Default Card Name">
        <base-input placeholder="Default Card Name" />
      </base-form-item>
      <base-form-item label="Card Initial Balance">
        <base-input placeholder="Card Initial Balance" />
      </base-form-item>
      <div class="flex justify-between">
        <base-button color="transparent">Skip</base-button>
        <base-button>Next</base-button>
      </div>
    </base-card>
  </div>
</template>
