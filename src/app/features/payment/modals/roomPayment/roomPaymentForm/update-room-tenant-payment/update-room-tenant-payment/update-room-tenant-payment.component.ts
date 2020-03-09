import { Component, OnInit, Inject } from '@angular/core';
import { DataPaymentService } from '@gmrc-admin/shared/services';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatSelectChange } from '@angular/material';
import { PaymentStatus } from 'src/app/features/payment/payment.enums';
import { addRentBalanceFormGroup } from '../helpers/add-rent-balance-form-group';
import { removeRentBalanceFormGroup } from '../helpers/remove-rent-balance-form-group';
import { addRiceCookerBillBalFormGroup } from '../helpers/add-rice-cooker-bill-bal-form-group';
import { removeRiceCookerBillBalFormGroup } from '../helpers/remove-rice-cooker-bill-bal-form-group';
import { getRentBalFormArr } from '../helpers/get-rent-bal-form-arr';
import { getRiceCookerBalFormArr } from '../helpers/get-rice-cooker-bal-form-arr';

@Component({
  selector: 'app-update-room-tenant-payment',
  templateUrl: './update-room-tenant-payment.component.html',
  styleUrls: ['./update-room-tenant-payment.component.scss']
})
export class UpdateRoomTenantPaymentComponent implements OnInit {
  public form = this.formBuilder.group({
    name: {value: this.data.name, disabled: true},
    dueDate: {value: this.data.dueRentDate, disabled: true},
    rent: {value: this.data.rent, disabled: true},
    rentStatus: this.data.rentStatus.value,
    rentBalance: this.formBuilder.array([]),
    riceCookerBill: {value: this.data.riceCookerBill, disabled: true},
    riceCookerBillStatus: this.data.riceCookerBillStatus.value,
    riceCookerBillBalance: this.formBuilder.array([]),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dataPaymentService: DataPaymentService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    if (this.data.rentStatus.balance !== null) {
      getRentBalFormArr(this.form).push(this.formBuilder.group({
        balance: this.data.rentStatus.balance,
      }));
    }
    if (this.data.riceCookerBillStatus.balance !== null) {
      getRiceCookerBalFormArr(this.form).push(
        this.formBuilder.group({
          balance: this.data.riceCookerBillStatus.balance
        }));
    }
  }
  
  statusToggle($event: MatSelectChange): void {
    if ($event.value === PaymentStatus.BALANCE) {
      addRentBalanceFormGroup(this.form);
    } else {
      removeRentBalanceFormGroup(this.form);
    }
  }
  riceCookerBillStatusToggle($event: MatSelectChange): void {
    if ($event.value === PaymentStatus.BALANCE) {
      addRiceCookerBillBalFormGroup(this.form);
    } else {
      removeRiceCookerBillBalFormGroup(this.form);
    }
  }

}
