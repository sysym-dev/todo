import { useAuthStore } from 'src/features/auth/auth.store';

export function requireSetupFinished(to) {
  const authStore = useAuthStore();

  if (
    to.matched.some((route) => route.meta.requireSetupFinished) &&
    !authStore.me.setupFinished
  ) {
    return {
      name: 'setup',
    };
  }
}
