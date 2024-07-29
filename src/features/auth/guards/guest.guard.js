import { useAuthStore } from 'src/features/auth/auth.store';

export function requireGuest(to) {
  const authStore = useAuthStore();

  if (
    to.matched.some((route) => route.meta.requireGuest) &&
    authStore.loggedIn
  ) {
    return {
      name: 'home',
    };
  }
}
