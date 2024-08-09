<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseBadge from 'src/components/base/base-badge.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseTable from 'src/components/base/base-table.vue';
import BaseDropdown from 'src/components/base/base-dropdown.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import BaseInput from 'src/components/base/base-input.vue';
import TransactionNewModal from './transaction-new-modal.vue';
import TransactionDetailModal from './transaction-detail-modal.vue';
import TransactionTypeBadge from './transaction-type-badge.vue';
import TransactionTransferBalanceModal from './transaction-transfer-balance-modal.vue';
import { ref, h, reactive, computed } from 'vue';
import { useRequest } from 'src/cores/request/request';
import { formatCurrency } from 'src/utils/number';
import { formatDate, parseDate } from 'src/utils/date';

const props = defineProps({
  defaultDateRange: Object,
  title: String,
  withFilter: {
    type: Boolean,
    default: true,
  },
});

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
const transferBalanceModalVisible = ref(false);
const detailModal = reactive({
  transactionId: null,
  visible: false,
});
const params = reactive({
  page: 1,
  sort: '-date',
  limit: 10,
  date: null,
});

const filterAppliedCount = computed(() => (params.date ? 1 : 0));
const dateFilter = computed(() => {
  if (!params.date) {
    return props.defaultDateRange;
  }

  const date = parseDate(params.date);

  return {
    from_date: date.startOf('day').toISOString(),
    to_date: date.endOf('day').toISOString(),
  };
});

const columns = [
  {
    key: 'date',
    name: 'Date',
    value: (item) => formatDate(item.date, 'YYYY/MM/DD'),
  },
  {
    key: 'card',
    name: 'Card',
    value: (item) => item.card.name,
  },
  {
    key: 'category',
    name: 'Category',
    value: (item) =>
      item.transactionCategory ? item.transactionCategory.name : '-',
  },
  {
    key: 'type',
    name: 'Type',
    render: ({ item }) => h(TransactionTypeBadge, { transaction: item }),
  },
  {
    key: 'totalAmount',
    name: 'Amount',
    value: (item) => formatCurrency(item.totalAmount),
  },
];

function loadTransactions() {
  request({
    params: {
      page: params.page,
      limit: params.limit,
      sort: params.sort,
      include: ['card', 'transaction_category'],
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
function onOpenDetailModal(transaction) {
  detailModal.transactionId = transaction.id;
  detailModal.visible = true;
}
function onOpenTransferBalanceModal() {
  transferBalanceModalVisible.value = true;
}

loadTransactions();
</script>

<template>
  <div>
    <base-card
      :title="title ?? 'Transactions'"
      :title-loading="loading"
      :with-content="requested || !loading"
      :error="!!error"
      :error-message="error"
    >
      <template v-if="(requested || !loading) && !error" #action>
        <div class="gap-x-2 flex items-center">
          <base-dropdown
            v-if="withFilter"
            padless
            :classes="{
              wrapper: 'mt-2 left-0 right-auto sm:left-auto sm:right-0',
            }"
          >
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
          <base-button
            size="sm"
            color="transparent-bordered"
            @click="onOpenTransferBalanceModal"
            >Transfer Balance</base-button
          >
          <base-button size="sm" @click="onOpenCreateModal"
            >New Transaction</base-button
          >
        </div>
      </template>

      <base-table
        :columns="columns"
        :meta="transactions.meta"
        :data="transactions.data"
        clickable
        v-model:page="params.page"
        @change-page="onChangePage"
        @click-row="onOpenDetailModal"
      />
    </base-card>

    <transaction-new-modal
      v-model="createModalVisible"
      @success="onSuccessCreate"
    />
    <transaction-detail-modal
      :transaction-id="detailModal.transactionId"
      v-model="detailModal.visible"
    />
    <transaction-transfer-balance-modal
      v-model="transferBalanceModalVisible"
      @success="onSuccessCreate"
    />
  </div>
</template>
