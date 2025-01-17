export const lateRoutes = [
  {
    path: '/late',
    name: 'late',
    meta: {
      layout: 'LayoutApp',
      title: 'Late',
      requireAuth: true,
    },
    component: () => import('./pages/late-page.vue'),
  },
];
