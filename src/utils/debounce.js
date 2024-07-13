export function debounce(func, wait = 500) {
  let timeout;

  return () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => func(), wait);
  };
}
