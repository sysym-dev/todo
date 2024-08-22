import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(isBetween);
dayjs.extend(relativeTime);

export function parseDate(date) {
  return dayjs(date);
}
