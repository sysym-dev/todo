import { createData, createError } from 'src/utils/response';
import { ref } from 'vue';

export function useValidation(schema) {
  const error = ref([]);

  async function validate(data) {
    const res = await schema.safeParseAsync(data);

    if (res.success) {
      return createData(res.data);
    } else {
      error.value = res.error.issues.map((issue) => ({
        path: issue.path[0],
        message: issue.message,
      }));

      return createError(res.error);
    }
  }

  function hasError(key) {
    return !!error.value.find((err) => err.path === key);
  }

  function getError(key) {
    if (!hasError(key)) {
      return null;
    }

    return error.value.find((err) => err.path === key).message;
  }

  function resetError() {
    error.value = [];
  }

  return {
    error,
    validate,
    hasError,
    getError,
    resetError,
  };
}
