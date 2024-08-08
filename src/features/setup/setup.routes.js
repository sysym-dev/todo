export const setupRoutes = [
  {
    path: '/setup',
    name: 'setup',
    meta: {
      layout: 'LayoutAuth',
      requireAuth: true,
      requireSetupNotFinished: true,
    },
    component: () => import('./pages/setup-index-page.vue'),
  },
];
