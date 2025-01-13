import { useAuthStore } from 'src/features/auth/auth.store';

export function useAuthGuard(router) {
  router.beforeEach((to) => {
    const authStore = useAuthStore();

    if (
      to.matched.some((route) => route.meta.requireAuth) &&
      !authStore.loggedIn
    ) {
      return {
        name: 'auth.login',
      };
    }
  });
}
