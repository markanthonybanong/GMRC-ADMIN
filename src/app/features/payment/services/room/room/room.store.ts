import { RoomStoreState } from './room.store.state';
import { Store } from 'rxjs-observable-store';
import { Injectable, OnDestroy } from '@angular/core';
import { RoomEndpoint } from './room.endpoint';
import { DataStoreService } from '@gmrc-admin/shared/services';
import { getStoreRequestStateUpdater, updateState, removeEmptyKeys } from '@gmrc-admin/shared/helpers';
import { switchMap, tap, retry, takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { modifyRoomPaymentObj } from '../../../helpers/roomPayment/roomPayment/modify-room-payment-obj';
import { MatDialog, PageEvent } from '@angular/material';
import { SearchRoomPaymentsComponent } from '../../../modals/roomPayment/roomPayment/search-room-payments/search-room-payments.component';
import { PAYMENT_CONFIG } from '../../../payment.config';
import { setRoomPaymentFilter } from '../../../helpers/roomPayment/roomPayment/set-room-payment-filter';
import { Router } from '@angular/router';
@Injectable()
export class RoomStore extends Store<RoomStoreState> implements OnDestroy{
    public tableName = 'Room';
    private destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        private endpoint: RoomEndpoint,
        private dataStoreService: DataStoreService,
        private dialog: MatDialog,
        private router: Router,
    ) {
        super (new RoomStoreState());
    }
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
     }
    init(): void {
        this.dataStoreService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        this.initReloadTable$();
        this.dataStoreService.reloadTable$.next();
    }
    onSearch(): void {
        this.dialog.open(SearchRoomPaymentsComponent, {})
         .afterClosed().subscribe((result) => {
            if(result) {
                this.setState({
                    ...this.state,
                    table: {
                      ...this.state.table,
                      pageRequest: {
                        page: null,
                        limit: this.dataStoreService.pageLimit,
                        filters: {
                          type: PAYMENT_CONFIG.filter.type.ADVANCESEARCHROOMPAYMENT,
                          roomPaymentFilter: setRoomPaymentFilter(removeEmptyKeys(result)),
                        }
                      }
                    }
                });
                this.dataStoreService.reloadTable$.next();   
            }
        });
    }
    onDisplayAllRoomPayments(): void {
        this.setState({
            ...this.state,
            table: {
                ...this.state.table,
                pageRequest: {
                    page: 1,
                    limit: 10,
                    filters: {
                        type: PAYMENT_CONFIG.filter.type.ALLROOMPAYMENTS   
                    }
                }
            }
        });
        this.dataStoreService.reloadTable$.next();
    }
    onAddRoomPayment(): void {
        this.router.navigate(['payment/add-room-payment']);
    }
    onRoomPaymentUpdate(roomPaymentObjId: string): void {
        this.router.navigate([`payment/update-room-payment/${roomPaymentObjId}`]);
    }
    onPaginatorUpdate($event: PageEvent): void {
        this.setState({
            ...this.state,
            table: {
              ...this.state.table,
              pageRequest: {
                ...this.state.table.pageRequest,
                page: $event.pageIndex + 1,
                limit: $event.pageSize
              }
            }
          });
          this.dataStoreService.reloadTable$.next();
    }
    private initReloadTable$(): void {
        this.dataStoreService.reloadTable$
          .pipe(
            switchMap(() => {
              return this.endpoint.getRoomPayments(this.state.table.pageRequest, this.dataStoreService.storeRequestStateUpdater);
            }),
            map((pageData)=> modifyRoomPaymentObj(pageData)),
            tap((pageData) => {
              updateState(this, pageData);
            }),
            retry(1),
            takeUntil(this.destroy$)
          ).subscribe();
    }


}
