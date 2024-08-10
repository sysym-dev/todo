export const authRoutes = [
  {
    path: '/login',
    name: 'auth.login',
    meta: {
      layout: 'LayoutAuth',
      requireGuest: true,
      title: 'Login',
    },
    component: () => import('./pages/auth-login-page.vue'),
  },
  {
    path: '/login/github',
    name: 'auth.login.github.callback',
    meta: {
      layout: 'LayoutAuth',
      title: 'Login With Github',
    },
    component: () => import('./pages/auth-login-github-callback-page.vue'),
  },
];
