import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoomFormStoreState } from '../../../services/room/room-form/room-form.store.state';
import { FormGroup } from '@angular/forms';
import { Moment } from 'moment';
import { MatDatepicker, MatSelect } from '@angular/material';

@Component({
  selector: 'app-room-payment-form',
  templateUrl: './room-payment-form.component.html',
  styleUrls: ['./room-payment-form.component.scss']
})
export class RoomPaymentFormComponent implements OnInit {
  @Input() state: RoomFormStoreState;
  @Input() roomPaymentForm: FormGroup;
  @Input() roomNumbers: Array<number>;
  @Input() paymentStatuses: Array<string>;
  @Input() electricBillPlaceHolder: string;
  @Input() waterBillPlaceHolder: string;
  @Input() isDisableTenantsButton: boolean;
  @Output() roomPaymentFormOnChoosenMonthHandler: EventEmitter<object> = new EventEmitter<object>();
  @Output() roomPaymentFormOnShowTenants: EventEmitter<null> = new EventEmitter<null>();
  @Output() roomPaymentFormOnCalculateTotalKWUsed: EventEmitter<null> = new EventEmitter<null>();
  @Output() roomPaymentFormOnRoomNumberSelect: EventEmitter<MatSelect> = new EventEmitter<MatSelect>();
  @Output() roomPaymentFormOnCalculateTotalAmountElectricBill: EventEmitter<null> = new EventEmitter<null>();
  @Output() roomPaymentFormOnElectricBillStatusSelect: EventEmitter<string> = new EventEmitter<string>();
  @Output() roomPaymentFormOnCalculateWaterBill: EventEmitter<null> = new EventEmitter<null>();
  @Output() roomPaymentFormOnWaterBillStatusSelect: EventEmitter<string> = new EventEmitter<string>();
  @Output() roomPaymentFormOnSubmit: EventEmitter<null> = new EventEmitter<null>();
  @Output() roomPaymentFormOnBack: EventEmitter<null> = new EventEmitter<null>();

  constructor() { }

  ngOnInit() {
  }
  onChosenMonthHandler(date: Moment, datepicker: MatDatepicker<Moment>): void {
    this.roomPaymentFormOnChoosenMonthHandler.emit({date: date, datepicker: datepicker});
  }
  onShowTenants(): void {
    this.roomPaymentFormOnShowTenants.emit();
  }
  onCalculateTotalKWUsed(): void {
    this.roomPaymentFormOnCalculateTotalKWUsed.emit();
  }
  onRoomNumberSelect($event: MatSelect): void {
    this.roomPaymentFormOnRoomNumberSelect.emit($event);
  }
  onCalculateTotalAmountElectricBill(): void {
    this.roomPaymentFormOnCalculateTotalAmountElectricBill.emit();
  }
  onElectricBillStatusSelect($event: MatSelect): void {
    this.roomPaymentFormOnElectricBillStatusSelect.emit($event.value);
  }
  onCalculateWaterBill(): void {
    this.roomPaymentFormOnCalculateWaterBill.emit();
  }
  onWaterBillStatusSelect($event: MatSelect): void {
    this.roomPaymentFormOnWaterBillStatusSelect.emit($event.value);
  }
  onSubmit(): void {
    this.roomPaymentFormOnSubmit.emit();
  }
  onBack(): void {
    this.roomPaymentFormOnBack.emit();
  }
}
