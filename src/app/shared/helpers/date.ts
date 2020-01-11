import * as moment from 'moment';
export function toDateString(date: Date): string {
  return moment(date).format('dddd LL');
}
export function isDateAfter(date: Date): boolean {
  return moment().isAfter(date, 'day');
}
export function dateDiff(date: Date): number {
  return moment().diff(date, 'day');
}
