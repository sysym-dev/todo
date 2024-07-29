export const cardRoutes = [
  {
    path: '/cards',
    name: 'card.index',
    meta: {
      layout: 'LayoutApp',
      requireAuth: true,
    },
    component: () => import('./pages/card-index-page.vue'),
  },
];
