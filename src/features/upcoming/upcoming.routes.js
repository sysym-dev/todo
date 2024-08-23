export const upcomingRoutes = [
  {
    path: '/upcoming',
    name: 'upcoming',
    meta: {
      layout: 'LayoutApp',
    },
    component: () => import('./pages/upcoming-page.vue'),
  },
];
