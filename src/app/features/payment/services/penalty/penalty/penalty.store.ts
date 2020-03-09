import { Injectable } from '@angular/core';
import { PenaltyEndpoint } from './penalty.endpoint';
import { Store } from 'rxjs-observable-store';
import { PenaltyStoreState } from './penalty.store.state';
import { Subject } from 'rxjs';
import { DataStoreService, ModalService, DataRoomPaymentService, DataRoomService } from '@gmrc-admin/shared/services';
import { getStoreRequestStateUpdater, updateState, removeEmptyKeys } from '@gmrc-admin/shared/helpers';
import { switchMap, tap, retry, takeUntil, map } from 'rxjs/operators';
import { PageEvent, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { modifyPenaltyObject } from '../../../helpers/penalty/modify-penalty-object';
import { PAYMENT_CONFIG } from '../../../payment.config';
import { SearchPenaltyPaymentsComponent } from '../../../modals/penalty/penalty/search-penalty-payments/search-penalty-payments.component';
import { setPenaltyPaymentFilter } from '../../../helpers/penalty/penalty/set-penalty-payment-filter';

@Injectable()
export class PenaltyStore extends Store<PenaltyStoreState> {
    public tableName = 'Penalty';
    private destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        private endpoint: PenaltyEndpoint,
        private dataStoreService: DataStoreService,
        private router: Router,
        private modalService: ModalService,
        private dataRoomService: DataRoomService,
        private dialog: MatDialog,
    ) {
        super( new PenaltyStoreState());
    }
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    init(): void {
        this.dataRoomService.setRooms();
        this.dataStoreService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        this.initReloadTenants$();
        this.dataStoreService.reloadTable$.next();
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
    onSearch(): void {
      this.dialog.open(SearchPenaltyPaymentsComponent, {})
        .afterClosed().subscribe( searchResult => {
           if(searchResult) {
            delete searchResult.tenantName;
            this.setState({
              ...this.state,
              table: {
                ...this.state.table,
                pageRequest: {
                  page: null,
                  limit: this.dataStoreService.pageLimit,
                  filters: {
                    type: PAYMENT_CONFIG.filter.type.ADVANCESEARCHPENALTY,
                    penaltyFilter: setPenaltyPaymentFilter(removeEmptyKeys(searchResult)),
                  }
                }
              }
            });
            this.dataStoreService.reloadTable$.next();   
          }
        });
    }
    onDisplayAllPenalties(): void {
      this.setState({
        ...this.state,
        table: {
            ...this.state.table,
            pageRequest: {
                page: 1,
                limit: 10,
                filters: {
                    type: PAYMENT_CONFIG.filter.type.ALLPENALTIES,   
                }
            }
        }
      });
      this.dataStoreService.reloadTable$.next();      
    }
    onAddPenalty(): void {
        this.router.navigate(['payment/add-penalty']);
    }
    onUpdatePenalty(penaltyObj: string): void {
      this.router.navigate([`payment/update-penalty/${penaltyObj}`]);
    }
    onDeletePenalty(penaltyObj: string): void {
      this.modalService.confirmation(PAYMENT_CONFIG.action.deletePenalty, 'Delete this penalty?')
        .afterClosed().subscribe(isDelete => {
          if(isDelete) {
            this.endpoint.deletePenalty(penaltyObj, this.dataStoreService.storeRequestStateUpdater)
            .pipe(
              tap(
                () => {
                  this.modalService.success(PAYMENT_CONFIG.action.deletePenalty, 'Deleted penalty');
                  this.dataStoreService.reloadTable$.next();
                },
                () => {
                  this.modalService.error(PAYMENT_CONFIG.action.deletePenalty);
                }
              )
            )
            .subscribe();
          }
        });
    }
    private initReloadTenants$(): void {
        this.dataStoreService.reloadTable$
          .pipe(
            switchMap(() => {
              return this.endpoint.getPenalties(this.state.table.pageRequest, this.dataStoreService.storeRequestStateUpdater);
            }),
            map((pageData) => {
              return modifyPenaltyObject(pageData);
            }),
            tap((pageData) => {
             updateState(this, pageData);
            }),
            retry(1),
            takeUntil(this.destroy$)
          ).subscribe();
    }

}
