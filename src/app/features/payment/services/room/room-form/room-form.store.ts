import { Injectable} from '@angular/core';
import { Store } from 'rxjs-observable-store';
import { RoomFormStoreState } from './room-form.store.state';
import { FormBuilder, Validators } from '@angular/forms';
import { PaymentStatus } from '../../../payment.enums';
import { DataRoomService, DataRoomPaymentService, DataStoreService, ModalService } from '@gmrc-admin/shared/services';
import { MatDatepicker, MatSelect, PageEvent, MatDialog } from '@angular/material';
import { Moment } from 'moment';
import { RoomFormEndpoint } from './room-form.endpoint';
import { tap, map } from 'rxjs/operators';
import { setRoomPaymentFormValues } from '../../../helpers/roomPayment/roomPaymentForm/set-room-payment-form-values';
import { setRoomPaymentObj } from '../../../helpers/roomPayment/roomPaymentForm/set-room-payment-obj';
import { addElectricBillInterest } from '../../../helpers/roomPayment/roomPaymentForm/add-electric-bill-interest';
import { electricBillBalanceFormArr } from '../../../helpers/roomPayment/roomPaymentForm/electric-bill-balance-form-arr';
import { addWaterBillInterest } from '../../../helpers/roomPayment/roomPaymentForm/add-water-bill-interest';
import { RoomTenant } from '../../../types/roomPayment/room-tenant';
import { waterBillBalanceFormArr } from '../../../helpers/roomPayment/roomPaymentForm/water-bill-balance-form-arr';
import { PAYMENT_CONFIG } from '../../../payment.config';
import { getStoreRequestStateUpdater, createBalanceFormGroup } from '@gmrc-admin/shared/helpers';
import { getRoomTenants } from '../../../helpers/roomPayment/roomPaymentForm/get-room-tenants';
import { addRoomTenantsToForm } from '../../../helpers/roomPayment/roomPaymentForm/add-room-tenants-to-form';
import { setRoomTenantsArr } from '../../../helpers/roomPayment/roomPaymentForm/set-room-tenants-arr';
import { setRoomTenantsTablePagination } from '../../../helpers/roomPayment/roomPaymentForm/set-room-tenants-table-pagination';
import { addRoomRentInterest } from '../../../helpers/roomPayment/roomPaymentForm/add-room-rent-interest';
import { addRiceCookerBillInterest } from '../../../helpers/roomPayment/roomPaymentForm/add-rice-cooker-bill-interest';
import { UpdateRoomTenantPaymentComponent } from '../../../modals/roomPayment/roomPaymentForm/update-room-tenant-payment/update-room-tenant-payment/update-room-tenant-payment.component';
import { RoomPayment } from '../../../types/roomPayment/room-payment';
import { Observable } from 'rxjs';
import { addRoomTypeToForm } from '../../../helpers/roomPayment/roomPaymentForm/add-room-type';
import { Location } from '@angular/common';

@Injectable()
export class RoomFormStore extends Store<RoomFormStoreState>{
  
    public roomPaymentForm = this.formBuilder.group({
                                roomNumber: [{value: null, disabled: true}, Validators.required],
                                date: [null, Validators.required],
                                previousReading: [null, Validators.required],
                                previousReadingKWUsed: [null, Validators.required],
                                presentReading: [null, Validators.required],
                                presentReadingKWUsed: [null, Validators.required],
                                total: [{value: null, disabled: true}],
                                amountKWUsed: [null, Validators.required],
                                totalAmountElectricBill: [{value: null, disabled: true}],
                                electricBillInterest: null,
                                electricBillStatus: [PaymentStatus.UNPAID, Validators.required],
                                electricBillBalance: this.formBuilder.array([]),
                                enterWaterBill: null,
                                waterBillStatus: PaymentStatus.NONE,
                                waterBill: [{value: null, disabled: true}],
                                waterBillInterest: null,
                                waterBillBalance: this.formBuilder.array([]),
                                roomTenants: [null, Validators.required],
                                roomType: null,
                                _id: null,
                             });
    constructor(
        private formBuilder: FormBuilder,
        private dataRoomService: DataRoomService,
        private dataRoomPaymentService: DataRoomPaymentService,
        private dataStoreService: DataStoreService,
        private endpoint: RoomFormEndpoint,
        private dialog: MatDialog,
        private modalService: ModalService,
        private location: Location,
    ) {
       super( new RoomFormStoreState());
    }
    get roomTenants(): Array<RoomTenant> {
        return this.roomPaymentForm.get('roomTenants').value;
    }
    get roomType(): string{
        return this.roomPaymentForm.get('roomType').value;
    }
    init(): void {
        this.dataStoreService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        this.dataRoomService.setRooms();
        this.state.isUpdate ? this.getRoomPayment() : this.roomPaymentForm.get('roomNumber').enable();;
    }
    onChoosenMonthHandler(datePicker:{date: Moment, datepicker: MatDatepicker<Moment>}): void {
        this.dataRoomPaymentService.date = datePicker.date;
        this.roomPaymentForm.get('date').setValue(this.dataRoomPaymentService.monthYear);
        datePicker.datepicker.close();
    }
    onCalculateTotalKWUsed(): void {
        const previousReading = this.roomPaymentForm.get('previousReadingKWUsed').value;
        const presentReading = this.roomPaymentForm.get('presentReadingKWUsed').value;
        const absoluteNum = Math.abs(previousReading - presentReading);
        this.roomPaymentForm.get('total').setValue(Math.round( absoluteNum * 100 + Number.EPSILON ) / 100);
    }
    onRoomNumberSelect($event: MatSelect): void {
        this.dataRoomPaymentService.isDisableTenantsButton = false;
    }
    onCalculateTotalAmountElectricBill(): void {
        const totalKWused = this.roomPaymentForm.get('total').value;
        const amountKWUsed = this.roomPaymentForm.get('amountKWUsed').value;
        this.roomPaymentForm.get('totalAmountElectricBill').setValue(Math.round(totalKWused * amountKWUsed));     
        addElectricBillInterest(this.roomPaymentForm.value, this.dataRoomPaymentService)
    }
    onElectricBillStatusSelect(paymentStatus: string): void {
        if (paymentStatus === PaymentStatus.BALANCE) {
            electricBillBalanceFormArr(this.roomPaymentForm).push(createBalanceFormGroup());
        } else if(paymentStatus !== PaymentStatus.BALANCE && electricBillBalanceFormArr(this.roomPaymentForm).length) {
            electricBillBalanceFormArr(this.roomPaymentForm).removeAt(0);
        }
    }
  
    onCalculateWaterBill(): void {
        this.roomPaymentForm.get('waterBill').setValue(this.roomPaymentForm.get('enterWaterBill').value);
        addWaterBillInterest(this.roomPaymentForm.value, this.dataRoomPaymentService);
    }
    onWaterBillStatusSelect(paymentStatus: string): void {
        if (paymentStatus === PaymentStatus.BALANCE) {
            waterBillBalanceFormArr(this.roomPaymentForm).push(createBalanceFormGroup());
        } else if(paymentStatus !== PaymentStatus.BALANCE && waterBillBalanceFormArr(this.roomPaymentForm).length) {
            waterBillBalanceFormArr(this.roomPaymentForm).removeAt(0);
        }
    }
    //ORDER MATTER
    onShowTenants(): void {
        this.setState({
            ...this.state,
            pageRequest: {
                page: 1,
                limit: 1,
                filters: {
                    type: PAYMENT_CONFIG.filter.type.ROOMNUMBER,
                    roomFilter: {
                        number: this.roomPaymentForm.get('roomNumber').value
                    }
                }
            }
        });
                      
        this.endpoint.roomByRoomNumber(this.state.pageRequest, this.dataStoreService.storeRequestStateUpdater)
        .pipe(
            tap((pageData) => {
                const roomTenants = getRoomTenants(pageData.data[0]);
                addRoomTypeToForm(this.roomPaymentForm, pageData.data[0].type);
                addRoomTenantsToForm(this.roomPaymentForm, roomTenants);
                this.dataRoomPaymentService.roomTenants = [];
                setRoomTenantsArr(roomTenants, this.dataRoomPaymentService.roomTenants);
                this.setState({
                    ...this.state,
                    roomTenants: this.dataRoomPaymentService.roomTenants
                });
                addRoomRentInterest(this.dataRoomPaymentService);
                addRiceCookerBillInterest(this.dataRoomPaymentService, pageData.data[0].type);
                setRoomTenantsTablePagination(this.dataRoomPaymentService, this);
            })
        )
        .subscribe();
    }
    onPaginatorUpdate($event: PageEvent): void {
        this.dataRoomPaymentService.pageNumber = $event.pageIndex;
        this.dataRoomPaymentService.pageSize   = $event.pageSize;
        setRoomTenantsTablePagination(this.dataRoomPaymentService,   this);
    }
    onUpdateTenantPayment(roomTenantIndex: number ): void {
        this.dialog.open(
            UpdateRoomTenantPaymentComponent,
            {
              data: {
                name:  this.dataRoomPaymentService.roomTenants[roomTenantIndex].name,
                dueRentDate: this.dataRoomPaymentService.roomTenants[roomTenantIndex].dueRentDate,
                rent:    this.dataRoomPaymentService.roomTenants[roomTenantIndex].rent,
                rentStatus: {
                  value: this.dataRoomPaymentService.roomTenants[roomTenantIndex].rentStatus.value,
                  balance: this.dataRoomPaymentService.roomTenants[roomTenantIndex].rentStatus.balance !== null
                  ? this.dataRoomPaymentService.roomTenants[roomTenantIndex].rentStatus.balance
                  : null,
                },
                riceCookerBill: this.dataRoomPaymentService.roomTenants[roomTenantIndex].riceCookerBill,
                riceCookerBillStatus: {
                  value: this.dataRoomPaymentService.roomTenants[roomTenantIndex].riceCookerBillStatus.value,
                  balance: this.dataRoomPaymentService.roomTenants[roomTenantIndex].riceCookerBillStatus.balance !== null
                  ? this.dataRoomPaymentService.roomTenants[roomTenantIndex].riceCookerBillStatus.balance
                  : null,
                }
              }
            }
          ).afterClosed().subscribe( (result) => {
            if (result !== undefined) {
              this.dataRoomPaymentService.roomTenants[roomTenantIndex].rentStatus.value           = result.rentStatus;
              this.dataRoomPaymentService.roomTenants[roomTenantIndex].rentStatus.balance         = result.rentBalance.length > 0
                                                                                                    ? result.rentBalance[0].balance
                                                                                                    : null;
              this.dataRoomPaymentService.roomTenants[roomTenantIndex].riceCookerBillStatus.value = result.riceCookerBillStatus;
              this.dataRoomPaymentService.roomTenants[roomTenantIndex].riceCookerBillStatus.balance                                = result.riceCookerBillBalance.length > 0
                                                                                                    ? result.riceCookerBillBalance[0].balance
                                                                                                    : null;
             this.roomPaymentForm.get('roomTenants').patchValue(this.dataRoomPaymentService.roomTenants);
             setRoomTenantsTablePagination(this.dataRoomPaymentService,   this);
            }
          });        
    }
    onBack(): void {
        this.location.back();
    }
    onSubmit(): void {
        const roomPayment: Observable<RoomPayment> = this.state.isUpdate
                                                    ? this.endpoint.updateRoomPayment(this.roomPaymentForm.getRawValue(), this.dataStoreService.storeRequestStateUpdater)
                                                    : this.endpoint.addRoomPayment(this.roomPaymentForm.getRawValue(), this.dataStoreService.storeRequestStateUpdater);
        roomPayment.pipe(
            tap(
                (roomPayment) => {
                    const title   = this.state.isUpdate
                                    ? PAYMENT_CONFIG.action.updateRoomPayment
                                    : PAYMENT_CONFIG.action.addRoomPayment;

                    const content = this.state.isUpdate
                                    ? `Updated payment in room number ${roomPayment.roomNumber}`
                                    : `Added room payment  in room number ${roomPayment.roomNumber}`;
                   this.roomPaymentForm.get('_id').setValue(roomPayment._id);
                    this.setState({
                        ...this.state,
                        isUpdate: true,
                    });
                    this.modalService.success(title, content);
                },
                () => {
                this.modalService.error(this.state.isUpdate ? PAYMENT_CONFIG.action.updateRoomPayment : PAYMENT_CONFIG.action.addRoomPayment);
                }
            )
        ).subscribe();
        
    }
    private getRoomPayment(): void {
        this.dataRoomPaymentService.roomTenants = [];
        this.endpoint.getRoomPayments(this.state.pageRequest, this.dataStoreService.storeRequestStateUpdater)
        .pipe(
          map((pageData) => setRoomPaymentObj(pageData, this.dataRoomPaymentService)),
          tap((pageData) => {
            setRoomTenantsArr(pageData.data[0].roomTenants, this.dataRoomPaymentService.roomTenants);
            this.setState({
                ...this.state,
                roomTenants: this.dataRoomPaymentService.roomTenants
            });
            addRoomRentInterest(this.dataRoomPaymentService);
            addRiceCookerBillInterest(this.dataRoomPaymentService, pageData.data[0].roomType);
            setRoomTenantsTablePagination(this.dataRoomPaymentService, this);
            setRoomPaymentFormValues(this.roomPaymentForm, pageData.data[0]);
          })
        )
        .subscribe();
    }
}
