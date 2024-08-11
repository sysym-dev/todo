export const stateRoutes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'state.notfound',
    meta: {
      layout: 'LayoutState',
      title: 'Page Not Found',
    },
    component: () => import('./pages/not-found-page.vue'),
  },
];
