export const setupRoutes = [
  {
    path: '/setup',
    name: 'setup',
    meta: {
      layout: 'LayoutAuth',
      requireAuth: true,
      requireSetupNotFinished: true,
      title: 'Welcome',
    },
    component: () => import('./pages/setup-index-page.vue'),
  },
];
