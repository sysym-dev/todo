export const transactionRoutes = [
  {
    path: '/transactions',
    name: 'transaction.index',
    meta: {
      layout: 'LayoutApp',
    },
    component: () => import('./pages/transaction-index-page.vue'),
  },
];
