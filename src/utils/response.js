export function createData(data) {
  return {
    success: true,
    data,
    error: null,
  };
}

export function createError(error) {
  return {
    success: false,
    data: null,
    error,
  };
}
