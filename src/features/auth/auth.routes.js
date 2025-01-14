export const authRoutes = [
  {
    path: '/login',
    name: 'auth.login',
    meta: {
      layout: 'LayoutAuth',
      title: 'Done',
      requireGuest: true,
    },
    component: () => import('./pages/login-page.vue'),
  },
];
