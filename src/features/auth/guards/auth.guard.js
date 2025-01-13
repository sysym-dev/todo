import { useAuthStore } from 'src/features/auth/auth.store';

export function useAuthGuard(router) {
  router.beforeEach(async (to) => {
    const authStore = useAuthStore();

    if (to.matched.some((route) => route.meta.requireAuth)) {
      const loggedIn = await authStore.checkSession();

      if (!loggedIn) {
        return {
          name: 'auth.login',
        };
      }
    }
  });
}
