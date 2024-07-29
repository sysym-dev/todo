import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export function useStore(app) {
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);

  app.use(pinia);
}
