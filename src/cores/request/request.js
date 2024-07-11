import axios, { AxiosError } from 'axios';
import { createData, createError } from 'src/utils/response';
import { ref } from 'vue';

export function useRequest(url, options = {}) {
  const data = ref(options?.initData ?? null);
  const loading = ref(options?.initLoading ?? false);
  const error = ref(null);

  function parseError(err) {
    if (err instanceof AxiosError) {
      return err.response.status === 404
        ? 'Error accessing data from the server'
        : err;
    }

    return err;
  }

  async function request() {
    loading.value = true;

    try {
      const res = await axios({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        url,
      });

      data.value = res.data;

      return createData(res.data);
    } catch (err) {
      error.value = parseError(err);

      return createError(error.value);
    } finally {
      loading.value = false;
    }
  }

  return { data, error, loading, request };
}
