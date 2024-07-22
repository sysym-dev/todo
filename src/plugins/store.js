import { createPinia } from 'pinia';

export function useStore(app) {
  app.use(createPinia());
}
