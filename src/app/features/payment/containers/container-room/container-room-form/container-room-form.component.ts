import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RoomFormStoreState } from '../../../services/room/room-form/room-form.store.state';
import { Observable } from 'rxjs';
import { RequestResponse } from '@gmrc-admin/shared/enums';
import { FormGroup } from '@angular/forms';
import { MatSelect, PageEvent } from '@angular/material';

@Component({
  selector: 'app-container-room-form',
  templateUrl: './container-room-form.component.html',
  styleUrls: ['./container-room-form.component.scss']
})
export class ContainerRoomFormComponent implements OnInit {
  @Input() state$: Observable<RoomFormStoreState>;
  @Input() requestResponse: RequestResponse;
  @Input() roomPaymentForm: FormGroup;
  @Input() roomNumbers: Array<number>;
  @Input() paymentStatuses: Array<string>;
  @Input() electricBillPlaceHolder: string;
  @Input() waterBillPlaceHolder: string;
  @Input() isDisableTenantsButton: boolean;
  @Input() roomType: string;
  @Input() pageSizeOptions: Array<number>;
  @Output() containerRoomFormOnChoosenMonthHandler: EventEmitter<object> = new EventEmitter<object>();
  @Output() containerRoomFormOnShowTenants: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerRoomFormOnCalculateTotalKWUsed: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerRoomFormOnRoomNumberSelect: EventEmitter<MatSelect> = new EventEmitter<MatSelect>();
  @Output() containerRoomFormOnCalculateTotalAmountElectricBill: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerRoomFormOnElectricBillStatusSelect: EventEmitter<string> = new EventEmitter<string>();
  @Output() containerRoomFormOnCalculateWaterBill: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerRoomFormOnWaterBillStatusSelect: EventEmitter<string> = new EventEmitter<string>();
  @Output() containerRoomFormOnPaginatorUpdate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() containerRoomFormOnUpdateTenantPayment: EventEmitter<number> = new EventEmitter<number>();
  @Output() containerRoomFormOnOnSubmit: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerRoomFormOnBack: EventEmitter<null> = new EventEmitter<null>();

  constructor() { }

  ngOnInit() {
  }
  onChoosenMonthHandler($event: object): void {
    this.containerRoomFormOnChoosenMonthHandler.emit($event);
  }
  onShowTenants(): void {
    this.containerRoomFormOnShowTenants.emit();
  }
  onCalculateTotalKWUsed(): void {
    this.containerRoomFormOnCalculateTotalKWUsed.emit();
  }
  onRoomNumberSelect($event: MatSelect): void {
    this.containerRoomFormOnRoomNumberSelect.emit($event);
  }
  onCalculateTotalAmountElectricBill(): void {
    this.containerRoomFormOnCalculateTotalAmountElectricBill.emit();
  }
  onElectricBillStatusSelect(paymentStatus: string): void {
    this.containerRoomFormOnElectricBillStatusSelect.emit(paymentStatus);
  }
  onCalculateWaterBill(): void {
    this.containerRoomFormOnCalculateWaterBill.emit();
  }
  onWaterBillStatusSelect(paymentStatus: string): void {
    this.containerRoomFormOnWaterBillStatusSelect.emit(paymentStatus);
  }
  onPaginatorUpdate($event: PageEvent): void {
    this.containerRoomFormOnPaginatorUpdate.emit($event);
  }
  onUpdateTenantPayment(tenantIndex: number): void {
    this.containerRoomFormOnUpdateTenantPayment.emit(tenantIndex);
  }
  onSubmit(): void {
    this.containerRoomFormOnOnSubmit.emit();
  }
  onBack(): void {
    this.containerRoomFormOnBack.emit();
  }
}
