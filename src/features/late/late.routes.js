export const lateRoutes = [
  {
    path: '/late',
    name: 'late',
    meta: {
      layout: 'LayoutApp',
      title: 'Late',
    },
    component: () => import('./pages/late-page.vue'),
  },
];
