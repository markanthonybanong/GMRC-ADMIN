import { PenaltyFormStoreState } from './penalty-form.store.state';
import { Store } from 'rxjs-observable-store';
import { Validators, FormBuilder } from '@angular/forms';
import { DataStoreService, DataRoomService, DataPenaltyService, ModalService } from '@gmrc-admin/shared/services';
import { PenaltyFormEndpoint } from './penalty-form.endpoint';
import { tap } from 'rxjs/internal/operators/tap';
import { map } from 'rxjs/operators';
import { modifyPenaltyObject } from '../../../helpers/penalty/modify-penalty-object';
import { getStoreRequestStateUpdater, createBalanceFormGroup } from '@gmrc-admin/shared/helpers';
import { setPenaltyFormValues } from '../../../helpers/penalty/penaltyForm/set-penalty-form-values';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PenaltyPayment } from '../../../types/penaltyPayment/penaltyPayment';
import { PAYMENT_CONFIG } from '../../../payment.config';
import { MatSelect } from '@angular/material';
import { PaymentStatus } from '../../../payment.enums';
import { getPaymentBalanceFormArr } from '../../../helpers/penalty/penaltyForm/get-payment-balance-form-arr';
import { PaymentTableHeaderComponent } from '../../../components/payment-table-header/payment-table-header.component';
@Injectable()
export class PenaltyFormStore extends Store<PenaltyFormStoreState> {
    public penaltyForm = this.formBuilder.group({
        roomNumber: [null, Validators.required],
        date: [null, Validators.required],
        tenant: null,
        tenantObjectId: [null, Validators.required],
        fine: [null, Validators.required],
        violation: [null, Validators.required],
        paymentStatus: [null, Validators.required],
        paymentBalance: this.formBuilder.array([]),
        _id: null,
    });
    constructor(
        private formBuilder: FormBuilder,
        private dataStoreService: DataStoreService,
        private dataRoomService: DataRoomService,
        private endpoint: PenaltyFormEndpoint,
        private dataPenaltyService: DataPenaltyService,
        private router: Router,
        private modalService: ModalService
    ) {
        super( new PenaltyFormStoreState())
    }
    init(): void {
        this.dataStoreService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        this.dataRoomService.setRooms();
        if (this.state.isUpdate) {
          this.getPenalty();
        }
    }
    onSetTenantObjectId(tenantObjId: string): void {
      this.penaltyForm.get('tenantObjectId').patchValue(tenantObjId);
    }
    onSubmit(): void {
      const penalty: Observable<PenaltyPayment> = this.state.isUpdate
      ? this.endpoint.updatePenalty(this.penaltyForm.value, this.dataStoreService.storeRequestStateUpdater)
      : this.endpoint.addPenalty(this.penaltyForm.value, this.dataStoreService.storeRequestStateUpdater);
      penalty.pipe(
          tap(
              (penaltyFromServer) => {
                  const title    = this.state.isUpdate
                                ? PAYMENT_CONFIG.action.updatePenalty
                                : PAYMENT_CONFIG.action.addPenalty;
                                
                  const content  = this.state.isUpdate
                                     ? `Updated room number ${penaltyFromServer.roomNumber}'s penalty`
                                     : `Added penalty in room number ${penaltyFromServer.roomNumber}`;
                  this.penaltyForm.patchValue({_id: penaltyFromServer._id});             
                  this.modalService.success(title, content);
                  this.setState({
                      ...this.state,
                      isUpdate: true,
                  });
              },
              () => {
              this.modalService.error(this.state.isUpdate ? PAYMENT_CONFIG.action.updatePenalty : PAYMENT_CONFIG.action.addPenalty);
              }
          )
      ).subscribe();
    }
    onBack(): void {
      this.router.navigate(['payment/penalty']);
    }
    onPaymentStatusSelect($event: MatSelect): void {
      if($event.value === PaymentStatus.BALANCE && getPaymentBalanceFormArr(this.penaltyForm).length === 0) {
        getPaymentBalanceFormArr(this.penaltyForm).push(createBalanceFormGroup());
      } else if($event.value !== PaymentStatus.BALANCE && getPaymentBalanceFormArr(this.penaltyForm).length > 0) {
        getPaymentBalanceFormArr(this.penaltyForm).removeAt(0);
      }
    }
    private getPenalty(): void {
        this.endpoint.getPenalties(this.state.pageRequest, this.dataStoreService.storeRequestStateUpdater)
        .pipe(
          tap((pageData) => {
            setPenaltyFormValues(this.penaltyForm, pageData.data[0]);
          })
        )
        .subscribe(); 
    }
}
