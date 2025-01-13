export const doneRoutes = [
  {
    path: '/done',
    name: 'done',
    meta: {
      layout: 'LayoutApp',
      title: 'Done',
      requireAuth: true,
    },
    component: () => import('./pages/done-page.vue'),
  },
];
