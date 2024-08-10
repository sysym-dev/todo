export const profileRoutes = [
  {
    path: '/profile',
    name: 'profile',
    meta: {
      layout: 'LayoutApp',
      requireAuth: true,
      requireSetupFinished: true,
      title: 'Profile',
    },
    component: () => import('./pages/profile-index-page.vue'),
  },
];
