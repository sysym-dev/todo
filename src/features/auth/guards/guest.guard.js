import { useAuthStore } from 'src/features/auth/auth.store';

export function useGuestGuard(router) {
  router.beforeEach(async (to) => {
    const authStore = useAuthStore();

    if (to.matched.some((route) => route.meta.requireGuest)) {
      const loggedIn = await authStore.checkSession();

      if (loggedIn) {
        return {
          name: 'home',
        };
      }
    }
  });
}
