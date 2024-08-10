export const transactionRoutes = [
  {
    path: '/transactions',
    name: 'transaction.index',
    meta: {
      layout: 'LayoutApp',
      requireAuth: true,
      requireSetupFinished: true,
      title: 'Transactions',
    },
    component: () => import('./pages/transaction-index-page.vue'),
  },
];
