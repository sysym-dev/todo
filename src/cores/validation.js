import { createError, createSuccess } from 'src/utils/response';
import { ref } from 'vue';

export function useValidation(schema) {
  const error = ref({});

  function resetError() {
    error.value = {};
  }

  async function validate(data) {
    resetError();

    const status = await schema.safeParseAsync(data);

    if (status.error) {
      error.value = Object.fromEntries(
        status.error.issues.map((error) => [error.path[0], error.message]),
      );

      return createError(status.error);
    }

    return createSuccess(status.data);
  }

  return { error, validate, resetError };
}
