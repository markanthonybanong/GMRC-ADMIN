import { Component, OnInit } from '@angular/core';
import { PaymentStore } from '../../../services/payment/payment/payment.store';

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.scss'],
  providers: [PaymentStore]
})
export class ViewPaymentComponent implements OnInit {

  constructor(
    private store: PaymentStore
  ) { }

  ngOnInit() {
  }

}
