import { Injectable } from '@angular/core';
import { EntryFormStoreState } from './entry-form.store.state';
import { Store } from 'rxjs-observable-store';
import { EntryFormEndpoint } from './entry-form.endpoint';
import { DataStoreService, DataRoomService, ModalService } from '@gmrc-admin/shared/services';
import { getStoreRequestStateUpdater } from '@gmrc-admin/shared/helpers';
import { tap } from 'rxjs/operators';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { setEntryFormValues } from '../../../helpers/entry/entry-form/set-entry-form-values';
import { partialPaymentFormArr } from '../../../helpers/entry/entry-form/partial-payment-form-arr';
import { createPartialPaymentFormGroup } from '../../../helpers/entry/entry-form/create-partial-payment-form-group';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PAYMENT_CONFIG } from '../../../payment.config';
import { MatSelectChange } from '@angular/material';
import { PaymentStatus } from '../../../payment.enums';
import { oneMonthDepositBalanceFormArr } from '../../../helpers/entry/entry-form/one-month-deposit-balance-form-arr';
import { oneMonthAdvanceBalanceFormArr } from '../../../helpers/entry/entry-form/one-month-advance-balance-form-arr';
import { createBalanceFormGroup } from '../../../helpers/entry/entry-form/create-one-month-deposit-bal-form-group';
import { EntryPayment } from '../../../types/entryPayment/entryPayment';

@Injectable()
export class EntryFormStore extends Store<EntryFormStoreState>{
    public entryForm = this.formBuilder.group({
        roomNumber: [null, Validators.required],
        tenant: [null, Validators.required],
        monthlyRent: [null, Validators.required],
        key: [null, Validators.required],
        dateEntry: [null, Validators.required],
        dateExit: null,
        oneMonthDeposit: [null, Validators.required],
        oneMonthDepositBalance: this.formBuilder.array([]),
        oneMonthAdvance: [null, Validators.required],
        oneMonthAdvanceBalance: this.formBuilder.array([]),
        tenantObjectId: [null,  Validators.required],
        partialPayments: this.formBuilder.array([]),
        _id: null,
    });

    constructor(
        private endpoint: EntryFormEndpoint,
        private dataStoreService: DataStoreService,
        private dataRoomService: DataRoomService,
        private formBuilder: FormBuilder,
        private router: Router,
        private modalService: ModalService) {
        super(new EntryFormStoreState());
    }
    init(): void {
        this.dataStoreService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        this.dataRoomService.setRooms();
        if (this.state.isUpdate) {
          this.getEntry();
        }
    }
    onSetTenantObjId(tenantObjId: string): void {
        this.entryForm.get('tenantObjectId').patchValue(tenantObjId);
    }
    onOneMonthDepositToggle($event: MatSelectChange): void {
        if ($event.value === PaymentStatus.BALANCE && oneMonthDepositBalanceFormArr(this.entryForm).length === 0) {
            oneMonthDepositBalanceFormArr(this.entryForm).push(createBalanceFormGroup());
        } else if($event.value !== PaymentStatus.BALANCE && oneMonthDepositBalanceFormArr(this.entryForm).length) {
            oneMonthDepositBalanceFormArr(this.entryForm).removeAt(0);
        }
    }
    onOneMonthAdvanceToggle($event: MatSelectChange): void {
        if ($event.value === PaymentStatus.BALANCE && oneMonthAdvanceBalanceFormArr(this.entryForm).length === 0) {
            oneMonthAdvanceBalanceFormArr(this.entryForm).push(createBalanceFormGroup());
        } else if($event.value !== PaymentStatus.BALANCE && oneMonthDepositBalanceFormArr(this.entryForm).length) {
            oneMonthAdvanceBalanceFormArr(this.entryForm).removeAt(0);
        }
    }
    onAddPartialPayment(): void {
        partialPaymentFormArr(this.entryForm).push(createPartialPaymentFormGroup());
    }
    onBack(): void {
        this.router.navigate(['payment/entry']);
    }
    onSubmit(): void {
        const inquiry: Observable<EntryPayment> = this.state.isUpdate
        ? this.endpoint.updateEntry(this.entryForm.value, this.dataStoreService.storeRequestStateUpdater)
        : this.endpoint.addEntry(this.entryForm.value, this.dataStoreService.storeRequestStateUpdater);
        inquiry.pipe(
            tap(
                (entryFromServer) => {
                    const title    = this.state.isUpdate
                                  ? PAYMENT_CONFIG.action.updateEntry
                                  : PAYMENT_CONFIG.action.addEntry;
                                  
                    const content  = this.state.isUpdate
                                       ? `Updated room number ${entryFromServer.roomNumber}'s entry`
                                       : `Added entry in room number ${entryFromServer.roomNumber}`;
                    this.entryForm.patchValue({_id: entryFromServer._id});             
                    this.modalService.success(title, content);
                    this.setState({
                        ...this.state,
                        isUpdate: true,
                    });
                },
                () => {
                this.modalService.error(this.state.isUpdate ? PAYMENT_CONFIG.action.updateEntry : PAYMENT_CONFIG.action.addEntry);
                }
            )
        ).subscribe();
    }
    private getEntry(): void{
        this.endpoint.getEntries(this.state.pageRequest, this.dataStoreService.storeRequestStateUpdater)
        .pipe(
          tap((pageData) => {
            setEntryFormValues(this.entryForm, pageData.data[0]);
          })
        )
        .subscribe();
    }
}
