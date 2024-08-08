import { useAuthStore } from 'src/features/auth/auth.store';

export function requireSetupNotFinished(to) {
  const authStore = useAuthStore();

  if (
    to.matched.some((route) => route.meta.requireSetupNotFinished) &&
    authStore.me.setupFinished
  ) {
    return {
      name: 'home',
    };
  }
}
