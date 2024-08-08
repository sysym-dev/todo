export const homeRoutes = [
  {
    path: '/',
    name: 'home',
    meta: {
      layout: 'LayoutApp',
      requireAuth: true,
      requireSetupFinished: true,
    },
    component: () => import('./pages/home-page.vue'),
  },
];
