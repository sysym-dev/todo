<script setup>
import BasePagination from './base-pagination.vue';

defineProps({
  columns: Array,
  meta: {
    type: Object,
    default: () => ({
      total: 0,
      lastPage: 1,
    }),
  },
  data: Array,
  clickable: Boolean,
  withPagination: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['change-page', 'click-row']);

const page = defineModel('page');

const tdClasses = 'text-gray-900 py-2 px-3';

function onChangePage() {
  emit('change-page');
}
function onClickRow(item) {
  emit('click-row', item);
}
</script>

<template>
  <div class="space-y-4 overflow-x-auto">
    <table class="w-full border rounded-lg border-separate border-spacing-0">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="[
              'text-left border-b text-gray-900 py-2 px-3',
              column.thClasses,
            ]"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody v-if="!meta.total">
        <tr>
          <td :colspan="columns.length" class="text-gray-600 py-2 px-3">
            No Data
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <slot name="body" :tdClasses="[tdClasses]">
          <tr
            v-for="(item, index) in data"
            :key="item.id"
            :class="[clickable ? 'cursor-pointer hover:bg-gray-50' : '']"
            @click="onClickRow(item)"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              :class="[
                tdClasses,
                index !== data.length - 1 ? 'border-b' : '',
                column.itemClass,
              ]"
            >
              <component
                v-if="column.render"
                :is="column.render"
                :item="item"
              />
              <template v-else>
                {{ column.value ? column.value(item) : item[column.key] }}
              </template>
            </td>
          </tr>
        </slot>
      </tbody>
    </table>

    <base-pagination
      v-if="withPagination && meta.lastPage !== 1"
      :meta="meta"
      v-model="page"
      @change="onChangePage"
    />
  </div>
</template>
