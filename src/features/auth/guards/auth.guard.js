import { useAuthStore } from 'src/features/auth/auth.store';

export function requireAuth(to) {
  const authStore = useAuthStore();

  if (
    to.matched.some((route) => route.meta.requireAuth) &&
    !authStore.loggedIn
  ) {
    return {
      name: 'auth.login',
    };
  }
}
