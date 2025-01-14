import { defineStore } from 'pinia';
import { inject, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const supabase = inject('supabase');

  const user = ref(null);

  async function checkSession() {
    const session = await supabase.auth.getSession();

    const loggedIn = !!session.data.session;

    if (loggedIn && !user.value) {
      user.value = await supabase.auth.getUser();
    }

    return !!session.data.session;
  }

  return {
    checkSession,
    user,
  };
});
