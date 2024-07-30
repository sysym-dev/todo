import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRequest } from 'src/cores/request/request';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const {
      loading,
      error,
      request: fetchMe,
      resetError,
    } = useRequest('/api/me');

    const loggedIn = ref(false);
    const accessToken = ref(null);
    const me = ref(null);

    async function loadMe() {
      const res = await fetchMe();

      if (res.success) {
        me.value = res.data;
      }
    }

    async function login(data) {
      resetError();

      accessToken.value = data.accessToken;
      me.value = data.me;
      loggedIn.value = true;
    }

    function logout() {
      loggedIn.value = false;
      accessToken.value = null;
      me.value = null;
    }

    return { loading, error, me, accessToken, loggedIn, loadMe, login, logout };
  },
  { persist: true },
);
