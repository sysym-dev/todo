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
import { parseDate, getDatesInAWeek } from 'src/utils/date';
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

const { request } = useRequest('/api/transaction-reports/daily');

const today = parseDate();

const dates = getDatesInAWeek();

const data = reactive({
  labels: dates.map((date) => date.format('dddd')),
  datasets: [
    {
      label: 'Expenses',
      data: [],
      backgroundColor: colors.blue[100],
      borderColor: colors.blue[400],
      fill: true,
      borderWidth: 2,
    },
  ],
});
const options = {};

async function setDailyReport() {
  const res = await request({
    params: {
      month: today.month() + 1,
      year: today.year(),
    },
  });

  if (res.success) {
    data.datasets[0].data = dates.map((date) => {
      const reportDate = res.data.find((report) => {
        return parseDate(report.date).isSame(date, 'day');
      });

      if (reportDate) {
        return {
          x: date,
          y: reportDate.totalExpense,
        };
      } else {
        return {
          x: date,
          y: 0,
        };
      }
    });
  }
}

setDailyReport();
</script>

<template>
  <base-card title="Daily Expenses Report">
    <bar-chart :chart-data="data" :options="options" />
  </base-card>
</template>
