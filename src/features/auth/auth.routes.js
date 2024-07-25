export const authRoutes = [
  {
    path: '/login',
    name: 'auth.login',
    meta: {
      layout: 'LayoutAuth',
    },
    component: () => import('./pages/auth-login-page.vue'),
  },
];
