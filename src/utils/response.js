export function createSuccess(data) {
  return {
    success: true,
    error: null,
    data,
  };
}

export function createError(error) {
  return {
    success: false,
    error,
    data: null,
  };
}
