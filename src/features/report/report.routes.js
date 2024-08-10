export const reportRoutes = [
  {
    path: '/reports',
    name: 'report.index',
    meta: {
      layout: 'LayoutApp',
      requireAuth: true,
      requireSetupFinished: true,
      title: 'Reports',
    },
    component: () => import('./pages/report-index-page.vue'),
  },
];
