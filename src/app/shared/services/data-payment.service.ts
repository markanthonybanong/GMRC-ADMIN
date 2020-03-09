import { Injectable } from '@angular/core';
import { enumsToArray } from '../helpers';
import { PaymentStatus, KeyStatus } from 'src/app/features/payment/payment.enums';

@Injectable({
  providedIn: 'root'
})
export class DataPaymentService {

  constructor() { }

  get paymentStatuses(): Array<string> {
    return enumsToArray(PaymentStatus);
  }
  get keyStatuses(): Array<string> {
    return enumsToArray(KeyStatus);
  }
  get basicPaymentStatuses(): Array<string> {
    return this.paymentStatuses.filter(function(status, index, arr){ 
      return status !== 'Used one month advance' && status !== 'None' 
    });
  }
 
  
}
