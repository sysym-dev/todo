export const upcomingRoutes = [
  {
    path: '/upcoming',
    name: 'upcoming',
    meta: {
      layout: 'LayoutApp',
      title: 'Upcoming',
    },
    component: () => import('./pages/upcoming-page.vue'),
  },
];
