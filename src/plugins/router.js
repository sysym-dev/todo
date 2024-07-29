import { createRouter, createWebHistory } from 'vue-router';
import { requireAuth } from 'src/features/auth/guards/auth.guard';

export function useRouter(app, routes) {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  router.beforeEach(requireAuth);

  app.use(router);
}
