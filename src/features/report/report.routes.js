export const reportRoutes = [
  {
    path: '/reports',
    name: 'report.index',
    meta: {
      layout: 'LayoutApp',
    },
    component: () => import('./pages/report-index-page.vue'),
  },
];
