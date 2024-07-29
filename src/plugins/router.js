import { createRouter, createWebHistory } from 'vue-router';
import { requireAuth } from 'src/features/auth/guards/auth.guard';
import { requireGuest } from 'src/features/auth/guards/guest.guard';

export function useRouter(app, routes) {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  router.beforeEach(requireAuth);
  router.beforeEach(requireGuest);

  app.use(router);
}
