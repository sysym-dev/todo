export const profileRoutes = [
  {
    path: '/profile',
    name: 'profile',
    meta: {
      layout: 'LayoutApp',
      requireAuth: true,
      requireSetupFinished: true,
    },
    component: () => import('./pages/profile-index-page.vue'),
  },
];
