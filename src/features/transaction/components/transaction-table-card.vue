<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseBadge from 'src/components/base/base-badge.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseTable from 'src/components/base/base-table.vue';
import BaseDropdown from 'src/components/base/base-dropdown.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import BaseInput from 'src/components/base/base-input.vue';
import TransactionNewModal from './transaction-new-modal.vue';
import { ref, h, reactive, computed } from 'vue';
import { useRequest } from 'src/cores/request/request';
import { formatCurrency } from 'src/utils/number';
import { formatDate, parseDate } from 'src/utils/date';

const {
  loading,
  request,
  data: transactions,
  error,
  requested,
} = useRequest('/api/transactions', {
  initData: {
    data: [],
  },
  initLoading: true,
});

const createModalVisible = ref(false);
const params = reactive({
  page: 1,
  sort: '-id',
  limit: 10,
  date: null,
});

const filterAppliedCount = computed(() => (params.date ? 1 : 0));
const dateFilter = computed(() => {
  if (!params.date) {
    return {
      from_date: parseDate().startOf('month').toISOString(),
      to_date: parseDate().endOf('month').toISOString(),
    };
  }

  const date = parseDate(params.date);

  return {
    from_date: date.startOf('day').toISOString(),
    to_date: date.endOf('day').toISOString(),
  };
});

const columns = [
  {
    key: 'createdAt',
    name: 'Date',
    value: (item) => formatDate(item.createdAt, 'YYYY/MM/DD'),
  },
  {
    key: 'type',
    name: 'Type',
    itemClass: 'capitalize',
    render: ({ item }) =>
      h(
        BaseBadge,
        { color: item.type === 'income' ? 'green' : 'red' },
        {
          default: () => item.type,
        },
      ),
  },
  {
    key: 'amount',
    name: 'Amount',
    value: (item) => formatCurrency(item.amount),
  },
];

function loadTransactions() {
  request({
    params: {
      page: params.page,
      limit: params.limit,
      sort: params.sort,
      ...dateFilter.value,
    },
  });
}

function onOpenCreateModal() {
  createModalVisible.value = true;
}
function onSuccessCreate() {
  params.page = 1;
  params.date = null;

  loadTransactions();
}
function onChangePage() {
  loadTransactions();
}
function onFilter() {
  params.page = 1;

  loadTransactions();
}
function onResetFilter() {
  params.page = 1;
  params.date = null;

  loadTransactions();
}

loadTransactions();
</script>

<template>
  <div>
    <base-card
      title="Transactions"
      :title-loading="loading"
      :with-content="requested || !loading"
      :error="!!error"
      :error-message="error"
    >
      <template v-if="(requested || !loading) && !error" #action>
        <div class="gap-x-2 flex items-center">
          <base-dropdown padless>
            <template #toggle="{ toggle }">
              <base-button
                size="sm"
                color="transparent-bordered"
                @click="toggle"
              >
                <p>Filter</p>
                <base-badge v-if="filterAppliedCount" color="blue" size="sm"
                  >+{{ filterAppliedCount }}</base-badge
                >
              </base-button>
            </template>

            <div class="space-y-2 p-2">
              <div>
                <base-form-item label="Date" size="sm">
                  <base-input
                    type="date"
                    size="sm"
                    v-model="params.date"
                    @change="onFilter"
                  />
                </base-form-item>
              </div>
              <div v-if="params.date">
                <base-button size="sm" fullwidth @click="onResetFilter"
                  >Reset</base-button
                >
              </div>
            </div>
          </base-dropdown>
          <base-button size="sm" @click="onOpenCreateModal"
            >New Transaction</base-button
          >
        </div>
      </template>

      <base-table
        :columns="columns"
        :meta="transactions.meta"
        :data="transactions.data"
        v-model:page="params.page"
        @change-page="onChangePage"
      />
    </base-card>

    <transaction-new-modal
      v-model="createModalVisible"
      @success="onSuccessCreate"
    />
  </div>
</template>
