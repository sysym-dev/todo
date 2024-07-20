<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import { BarChart } from 'vue-chart-3';
import {
  Chart,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { parseDate } from 'src/utils/date';
import colors from 'tailwindcss/colors';
import { useRequest } from 'src/cores/request/request';
import { reactive } from 'vue';

Chart.register([
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
]);

const { request, loading, error } = useRequest(
  '/api/transaction-reports/monthly',
);

const data = reactive({
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  datasets: [
    {
      label: 'Expenses',
      data: [],
      backgroundColor: colors.blue[100],
      borderColor: colors.blue[400],
      fill: true,
      borderWidth: 2,
    },
    {
      label: 'Incomes',
      data: [],
      backgroundColor: colors.red[100],
      borderColor: colors.red[400],
      fill: true,
      borderWidth: 2,
    },
  ],
});
const options = {
  scales: {
    x: { stacked: true },
    y: { stacked: true },
  },
};

async function setMonthlyReport() {
  const today = parseDate();

  const res = await request({
    params: {
      year: today.year(),
    },
  });

  if (res.success) {
    const months = Array.from({ length: 12 }, (_, i) => i);

    data.datasets[0].data = months.map((month) => {
      const reportMonth = res.data.find((report) => {
        return month + 1 === report.month;
      });

      if (reportMonth) {
        return reportMonth.totalExpense;
      } else {
        return 0;
      }
    });

    data.datasets[1].data = months.map((month) => {
      const reportMonth = res.data.find((report) => {
        return month + 1 === report.month;
      });

      if (reportMonth) {
        return reportMonth.totalIncome;
      } else {
        return 0;
      }
    });
  }
}

setMonthlyReport();
</script>

<template>
  <base-card
    title="Monthly Transaction"
    :title-loading="loading"
    :with-content="!loading"
    :error="!!error"
    :error-message="error"
  >
    <bar-chart :chart-data="data" :options="options" />
  </base-card>
</template>
