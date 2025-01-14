export const authRoutes = [
  {
    path: '/login',
    name: 'auth.login',
    meta: {
      layout: 'LayoutAuth',
      title: 'Login',
      requireGuest: true,
    },
    component: () => import('./pages/login-page.vue'),
  },
  {
    path: '/register',
    name: 'auth.register',
    meta: {
      layout: 'LayoutAuth',
      title: 'Register',
      requireGuest: true,
    },
    component: () => import('./pages/register-page.vue'),
  },
];
