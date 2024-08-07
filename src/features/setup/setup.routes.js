export const setupRoutes = [
  {
    path: '/setup',
    name: 'setup.index',
    meta: {
      layout: 'LayoutAuth',
      requireAuth: true,
    },
    component: () => import('./pages/setup-index-page.vue'),
  },
];
