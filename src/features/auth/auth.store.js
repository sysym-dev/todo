import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRequest } from 'src/cores/request/request';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const { loading, error, request: fetchMe } = useRequest('/api/me');

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
      accessToken.value = data.accessToken;
      me.value = data.me;
      loggedIn.value = true;
    }

    return { loading, error, me, accessToken, loggedIn, loadMe, login };
  },
  { persist: true },
);
