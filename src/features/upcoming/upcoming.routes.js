export const upcomingRoutes = [
  {
    path: '/upcoming',
    name: 'upcoming',
    meta: {
      layout: 'LayoutApp',
      title: 'Upcoming',
      requireAuth: true,
    },
    component: () => import('./pages/upcoming-page.vue'),
  },
];
