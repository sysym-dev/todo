export const cardRoutes = [
  {
    path: '/cards',
    name: 'card.index',
    meta: {
      layout: 'LayoutApp',
      requireAuth: true,
      requireSetupFinished: true,
      title: 'Cards',
    },
    component: () => import('./pages/card-index-page.vue'),
  },
];
