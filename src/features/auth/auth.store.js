import { defineStore } from 'pinia';
import { inject, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const supabase = inject('supabase');

  async function checkSession() {
    const session = await supabase.auth.getSession();

    return !!session.data.session;
  }

  return {
    checkSession,
  };
});
