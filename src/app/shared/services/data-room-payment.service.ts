import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { RoomTenant } from 'src/app/features/payment/types/roomPayment/room-tenant';

@Injectable({
  providedIn: 'root'
})
export class DataRoomPaymentService {
  public date: Moment;
  public currentDate                              = moment().date();
  public electricBillPlaceHolder                  = 'Electric bill';
  public waterBillPlaceHolder                     = 'Water bill';
  public isDisableTenantsButton                   = true;
  public roomTenants: Array<RoomTenant>           = [];
  public pageNumber                               = 0;
  public pageSize                                 = 5;
  public roomTenantsDataSource: Array<RoomTenant> = [];
  constructor() { }
  get roomPayment(): object{
    return {
      name: 'Room Payments',
      addBtnName: 'Add Room Payment'
    };
  }
  get monthYear(): string {
    if (!this.date) { return null; }
    return moment(this.date).format('MM/YYYY');
  }
  get roomPaymentDisplayColumns(): Array<string> {
    return [
      'roomNumber',
      'dueDate',
      'electricBillStatus',
      'waterBillStatus',
      'riceCookerBillStatus',
      'rentStatus',
      'actions'
    ];
  }
  get roomTenantsTableDisplayedColumns(): Array<string> {
    return [
      'tenants',
      'dueDate',
      'monthlyRent',
      'riceCookerBill',
      'rentStatus',
      'riceCookerBillStatus',
      'action',
    ];
  }
  get pageSizeOptions(): Array<number> {
   return  [5, 10, 15];
  }

}
