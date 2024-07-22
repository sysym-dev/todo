import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRequest } from 'src/cores/request/request';

export const useAuthStore = defineStore('auth', () => {
  const { loading, error, request: fetchMe } = useRequest('/api/me');

  const me = ref(null);

  async function loadMe() {
    const res = await fetchMe();

    if (res.success) {
      me.value = res.data;
    }
  }

  return { loading, error, me, loadMe };
});
