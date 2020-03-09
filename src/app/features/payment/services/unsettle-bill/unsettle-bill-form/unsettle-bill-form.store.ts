import { Injectable } from '@angular/core';

import { Store } from 'rxjs-observable-store';
import { UnsettleBillFormStoreState } from './unsettle-bill-form.store.state';
import { DataStoreService, DataRoomService, ModalService } from '@gmrc-admin/shared/services';
import { getStoreRequestStateUpdater, createBalanceFormGroup } from '@gmrc-admin/shared/helpers';
import { UnsettleBillFormEndpoint } from './unsettle-bill-form.endpoint';
import { MatSelectChange } from '@angular/material';
import { PaymentStatus } from '../../../payment.enums';
import { oneMonthDepositBalanceFormArr } from '../../../helpers/entry/entry-form/one-month-deposit-balance-form-arr';
import { oneMonthAdvanceBalanceFormArr } from '../../../helpers/entry/entry-form/one-month-advance-balance-form-arr';
import { partialPaymentFormArr } from '../../../helpers/entry/entry-form/partial-payment-form-arr';
import { createPartialPaymentFormGroup } from '../../../helpers/entry/entry-form/create-partial-payment-form-group';
import { Observable } from 'rxjs';
import { EntryPayment } from '../../../types/entryPayment/entryPayment';
import { tap } from 'rxjs/operators';
import { PAYMENT_CONFIG } from '../../../payment.config';
import { setEntryFormValues } from '../../../helpers/entry/entry-form/set-entry-form-values';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { setUnsettleBillFormValues } from '../../../helpers/unSettleBill/unSettleBillForm/set-unsettle-bill-form-values';
import { Router } from '@angular/router';
import { UnsettleBillPayment } from '../../../types/unsettleBillPayment/unsettle-bill-payment';
import { getTenantsFormArr } from '../../../helpers/unSettleBill/unSettleBillForm/get-tenants-form-arr';
import { createTenantFormGroup } from '../../../helpers/unSettleBill/unSettleBillForm/create-tenant-form-group';
import { setUnsettleBillObject } from '../../../helpers/unSettleBill/unSettleBillForm/set-unsettle-bill-object';

@Injectable()
export class UnsettleBillFormStore extends Store<UnsettleBillFormStoreState> {
    public unsettleBillForm = this.formBuilder.group({
        roomNumber: [null, Validators.required],
        roomType: [null, Validators.required],
        dueDate: null,
        dateExit: null,
        rentBalance: null,
        electricBillBalance: null,
        waterBillBalance: null,
        riceCookerBillBalance: null,
        tenants: this.formBuilder.array([]),
        tenantsObjectId: [[]],
        _id: null
    });
 
    constructor(
        private dataStoreService: DataStoreService,
        private dataRoomService: DataRoomService,
        private endpoint: UnsettleBillFormEndpoint,
        private formBuilder: FormBuilder,
        private modalService: ModalService,
        private router: Router
    ) {
        super(new UnsettleBillFormStoreState());
    }
    init(): void {
        this.dataRoomService.setRooms();
        this.dataStoreService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        if (this.state.isUpdate) {
          this.getUnsettleBill();
        }
    }
    onSetTenantObjectId($event: {tenantObjectId: string, tenantIndex: number}): void {
        const tenantFormGroup = getTenantsFormArr(this.unsettleBillForm).at($event.tenantIndex) as FormGroup;
        tenantFormGroup.get('_id').setValue($event.tenantObjectId);
    }
    onAddTenant(): void {
        getTenantsFormArr(this.unsettleBillForm).push(createTenantFormGroup());
    }
    onBack(): void {
        this.router.navigate(['payment/unsettle-bill']);
    }
    onSubmit(): void {
        const unSettleBillPayment: Observable<UnsettleBillPayment> = this.state.isUpdate
        ? this.endpoint.updateUnsettleBill(setUnsettleBillObject(this.unsettleBillForm.value), this.dataStoreService.storeRequestStateUpdater)
        : this.endpoint.addUnsettleBill(setUnsettleBillObject(this.unsettleBillForm.value), this.dataStoreService.storeRequestStateUpdater);
        unSettleBillPayment.pipe(
            tap(
                (unSettleBillFromServer) => {
                    const title    = this.state.isUpdate
                                  ? PAYMENT_CONFIG.action.updateUnSettleBill
                                  : PAYMENT_CONFIG.action.addUnSettleBill;
                                  
                    const content  = this.state.isUpdate
                                       ? `Updated unsettle bill in room number ${unSettleBillFromServer.roomNumber}`
                                       : `Added unsettle bill in room number ${unSettleBillFromServer.roomNumber}`;
                    this.unsettleBillForm.patchValue({_id: unSettleBillFromServer._id});             
                    this.modalService.success(title, content);
                    this.setState({
                        ...this.state,
                        isUpdate: true,
                    });
                },
                () => {
                this.modalService.error(this.state.isUpdate ? PAYMENT_CONFIG.action.updateUnSettleBill : PAYMENT_CONFIG.action.addUnSettleBill);
                }
            )
        ).subscribe();
    }
    onRemoveTenant(tenantIndex: number): void {
        this.modalService.confirmation('Remove Tenant', 'Are you sure you want to remove this tenant?')
         .afterClosed().subscribe((removeTenant) => {
            if(removeTenant) {
                const tenantFormGroup = getTenantsFormArr(this.unsettleBillForm).at(tenantIndex) as FormGroup;
                if (tenantFormGroup.get('fromServer').value === true) {
                    const tenant = {
                      tenantObjectId: tenantFormGroup.get('_id').value,
                      unsettleBillObjectId: this.unsettleBillForm.get('_id').value,
                    };
                    this.endpoint.removeTenantInUnsettleBill(tenant, this.dataStoreService.storeRequestStateUpdater)
                    .pipe(
                      tap(
                        (unsettleBill) => {
                          getTenantsFormArr(this.unsettleBillForm).removeAt(tenantIndex);
                          this.modalService.success(PAYMENT_CONFIG.action.deleteTenant, `Deleted tenant in room number  ${unsettleBill.roomNumber}`);
                        },
                        () => {
                          this.modalService.error(PAYMENT_CONFIG.action.deleteTenant);
                        }
                      )
                    )
                    .subscribe();
                  } else {
                    getTenantsFormArr(this.unsettleBillForm).removeAt(tenantIndex);
                  }
            }
         });
    }
    private getUnsettleBill(): void{
        this.endpoint.getUnsettleBills(this.state.pageRequest, this.dataStoreService.storeRequestStateUpdater)
        .pipe(
          tap((pageData) => {
            setUnsettleBillFormValues(this.unsettleBillForm, pageData.data[0]);
          })
        )
        .subscribe();
    }
}
