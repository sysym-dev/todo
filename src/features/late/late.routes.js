export const lateRoutes = [
  {
    path: '/late',
    name: 'late',
    meta: {
      layout: 'LayoutApp',
    },
    component: () => import('./pages/late-page.vue'),
  },
];
