export const homeRoutes = [
  {
    path: '/',
    name: 'home',
    meta: {
      layout: 'LayoutApp',
      title: 'Today',
      requireAuth: true,
    },
    component: () => import('./pages/home-page.vue'),
  },
];
