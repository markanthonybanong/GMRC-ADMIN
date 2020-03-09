import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataUnsettleBillService {

  constructor() { }

  get unSettleBill(): object{
    return {
      name: 'Unsettle Bill Payments',
      addBtnName: 'Add Unsettle Bill Payment'
    };
  }

  get displayColumns(): Array<string> {
    return [
      'roomNumber',
      'roomType',
      'tenants',
      'rentBalance',
      'electricBillBalance',
      'waterBillBalance',
      'riceCookerBillBalance',
      'actions',
    ]
  }
}
