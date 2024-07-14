export const cardRoutes = [
  {
    path: '/cards',
    name: 'card.index',
    meta: {
      layout: 'LayoutApp',
    },
    component: () => import('./pages/card-index-page.vue'),
  },
];
