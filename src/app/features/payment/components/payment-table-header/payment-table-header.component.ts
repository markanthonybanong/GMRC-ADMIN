import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-payment-table-header',
  templateUrl: './payment-table-header.component.html',
  styleUrls: ['./payment-table-header.component.scss']
})
export class PaymentTableHeaderComponent implements OnInit {
  @Input() payment: {name: string, addBtnName: string};
  @Output() paymentTableHeaderOnSearch: EventEmitter<null> = new EventEmitter<null>();
  @Output() paymentTableHeaderOnDisplayAll: EventEmitter<null> = new EventEmitter<null>();
  @Output() paymentTableHeaderOnAdd: EventEmitter<null> = new EventEmitter<null>();
  constructor() { }

  ngOnInit() {
  }

  onSearch(): void {
    this.paymentTableHeaderOnSearch.emit();
  }
  onDisplayAll(): void {
    this.paymentTableHeaderOnDisplayAll.emit();
  }
  onAdd(): void {
    this.paymentTableHeaderOnAdd.emit();
  }

}
