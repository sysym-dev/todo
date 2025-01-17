import { defineStore } from 'pinia';
import { inject, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const supabase = inject('supabase');

  const user = ref(null);

  async function setUser() {
    user.value = await supabase.auth.getUser();
  }
  async function checkSession() {
    const session = await supabase.auth.getSession();

    const loggedIn = !!session.data.session;

    if (loggedIn && !user.value) {
      await setUser();
    }

    return !!session.data.session && !user.value.error;
  }

  return {
    checkSession,
    login: setUser,
    user,
  };
});
