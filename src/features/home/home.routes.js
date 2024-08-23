export const homeRoutes = [
  {
    path: '/',
    name: 'home',
    meta: {
      layout: 'LayoutApp',
    },
    component: () => import('./pages/home-page.vue'),
  },
];
