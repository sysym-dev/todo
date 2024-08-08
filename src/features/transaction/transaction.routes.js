export const transactionRoutes = [
  {
    path: '/transactions',
    name: 'transaction.index',
    meta: {
      layout: 'LayoutApp',
      requireAuth: true,
      requireSetupFinished: true,
    },
    component: () => import('./pages/transaction-index-page.vue'),
  },
];
