export const homeRoutes = [
  {
    path: '/',
    name: 'home',
    meta: {
      layout: 'LayoutApp',
      requireAuth: true,
    },
    component: () => import('./pages/home-page.vue'),
  },
];
