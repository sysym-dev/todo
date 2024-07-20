import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function formatDate(date, format) {
  return dayjs(date).format(format);
}

export function parseDate(date) {
  return dayjs(date);
}

export function getDatesInAWeek() {
  const startDate = dayjs().startOf('week');

  return Array.from({ length: 7 }).map((_, i) => startDate.add(i, 'day'));
}
