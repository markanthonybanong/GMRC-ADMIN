import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataEntryService {

  constructor() { }

  get entry(): object{
    return {
      name: 'Entry Payments',
      addBtnName: 'Add Entry Payment'
    };
  }

  get entryTableDisplayColumns(): Array<string> {
    return [
      'roomNumber',
      'tenant',
      'monthlyRent',
      'oneMonthDeposit',
      'oneMonthAdvance',
      'dateEntry',
      'actions'
    ];
  }
}
