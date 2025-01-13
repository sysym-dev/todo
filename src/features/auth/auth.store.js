import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const loggedIn = ref(false);

  return {
    loggedIn,
  };
});
