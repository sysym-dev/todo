export function formatCurrency(number) {
  return new Intl.NumberFormat('id-ID').format(number);
}
