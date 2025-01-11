export const doneRoutes = [
  {
    path: '/done',
    name: 'done',
    meta: {
      layout: 'LayoutApp',
      title: 'Done',
    },
    component: () => import('./pages/done-page.vue'),
  },
];
