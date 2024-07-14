import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function formatDate(date, format) {
  return dayjs(date).format(format);
}

export function parseDate(date) {
  return dayjs(date);
}
