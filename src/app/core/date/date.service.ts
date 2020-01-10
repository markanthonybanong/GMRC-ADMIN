import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }
  dateToDateString(date: Date): string {
    return moment(date).format('dddd LL');
  }
  isDateAfter(date: Date): boolean {
    return moment().isAfter(date, 'day');
  }
  dateDiff(date: Date): number {
    return moment().diff(date, 'day');
  }
}
