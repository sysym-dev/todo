export const homeRoutes = [
  {
    path: '/',
    name: 'home',
    meta: {
      layout: 'LayoutApp',
      title: 'Today',
    },
    component: () => import('./pages/home-page.vue'),
  },
];
