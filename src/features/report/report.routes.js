export const reportRoutes = [
  {
    path: '/reports',
    name: 'report.index',
    meta: {
      layout: 'LayoutApp',
      requireAuth: true,
    },
    component: () => import('./pages/report-index-page.vue'),
  },
];
