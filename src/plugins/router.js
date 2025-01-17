import { createRouter, createWebHistory } from 'vue-router';

export function useRouter(app, routes, guards) {
  const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL),
  });

  app.use(router);

  guards.forEach((guard) => guard(router));
}
