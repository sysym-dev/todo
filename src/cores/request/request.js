import axios, { AxiosError } from 'axios';
import { createData, createError } from 'src/utils/response';
import { ref } from 'vue';
import { useAuthStore } from 'src/features/auth/auth.store';
import { useRouter } from 'vue-router';

export function useRequest(url, options = {}) {
  const authStore = useAuthStore();
  const router = useRouter();

  const data = ref(options?.initData ?? null);
  const loading = ref(options?.initLoading ?? false);
  const error = ref(null);
  const requested = ref(false);

  function parseError(err) {
    if (err instanceof AxiosError) {
      if (!err.response) {
        return err.message;
      }

      if (err.response.data.message) {
        return err.response.data.message;
      }

      if (err.response.status === 404) {
        return 'Error accessing data from the server';
      }

      if (err.response.status === 422) {
        return 'Something error with your request';
      }

      return 'Something error';
    }

    return err;
  }

  async function request(config) {
    resetError();

    loading.value = true;

    try {
      const res = await axios({
        baseURL: import.meta.env.VITE_API_URL,
        url,
        headers: authStore.loggedIn
          ? {
              Authorization: `Bearer ${authStore.accessToken}`,
            }
          : {},
        ...config,
      });

      data.value = res.data;
      requested.value = true;

      return createData(res.data);
    } catch (err) {
      if (err instanceof AxiosError && err.response.status === 401) {
        authStore.logout();
        router.push({ name: 'auth.login' });
      }

      error.value = parseError(err);

      return createError(error.value);
    } finally {
      loading.value = false;
    }
  }

  function resetError() {
    error.value = null;
  }

  return { data, error, loading, requested, resetError, request };
}
