import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }
  dateToDateString(date: string): string {
    return moment(date).format('dddd LL');
  }
}
