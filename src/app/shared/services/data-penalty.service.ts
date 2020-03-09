import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataPenaltyService {

  constructor() { }

  get penalty(): object{
    return {
      name: 'Penalty Payments',
      addBtnName: 'Add Penalty Payment'
    };
  }

  get penaltyTableDisplayColumns(): Array<string> {
    return [
      'roomNumber',
      'date',
      'tenant',
      'violation',
      'fine',
      'paymentStatus',
      'actions',
    ];
  }

  get roomViolations(): Array<string> {
    return [
      'Cooking in room',
      'Washing clothes in room\'s c.r',
      'Smoking inside of the room',
    ]
  }

}
