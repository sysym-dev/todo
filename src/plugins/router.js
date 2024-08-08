import { createRouter, createWebHistory } from 'vue-router';
import { requireAuth } from 'src/features/auth/guards/auth.guard';
import { requireGuest } from 'src/features/auth/guards/guest.guard';
import { requireSetupFinished } from 'src/features/auth/guards/setup-finished.guard';
import { requireSetupNotFinished } from 'src/features/auth/guards/setup-not-finished.guard';

export function useRouter(app, routes) {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  router.beforeEach(requireAuth);
  router.beforeEach(requireGuest);
  router.beforeEach(requireSetupFinished);
  router.beforeEach(requireSetupNotFinished);

  app.use(router);
}
