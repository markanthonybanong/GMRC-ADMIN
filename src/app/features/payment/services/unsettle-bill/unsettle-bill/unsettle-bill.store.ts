import { UnsettleBillStoreState } from './unsettle-bill.store.state';
import { UnsettleBillEndpoint } from './unsettle-bill.endpoint';
import { Store } from 'rxjs-observable-store';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { DataStoreService, DataRoomService, ModalService } from '@gmrc-admin/shared/services';
import { getStoreRequestStateUpdater, removeTenantNameInSearchResult, removeEmptyKeys, updateState } from '@gmrc-admin/shared/helpers';
import { MatDialog, PageEvent } from '@angular/material';
import { SearchUnsettleBillComponent } from '../../../modals/unsettleBill/unsettleBill/search-unsettle-bill/search-unsettle-bill.component';
import { PAYMENT_CONFIG } from '../../../payment.config';
import { switchMap, map, tap, retry, takeUntil } from 'rxjs/operators';
import { modifyEntryObject } from '../../../helpers/entry/entry/modify-entry-object';
import { Router } from '@angular/router';
@Injectable()
export class UnsettleBillStore extends Store<UnsettleBillStoreState>{
    public tableName = 'Unsettle Bill';
    private destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        private endpoint: UnsettleBillEndpoint,
        private dataStoreService: DataStoreService,
        private dialog: MatDialog,
        private dataRoomService: DataRoomService,
        private router: Router,
        private modalService: ModalService
        ) {
        super(new UnsettleBillStoreState());
    }
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    init(): void {
        this.dataRoomService.setRooms();
        this.dataStoreService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
        this.initReloadTable$();
        this.dataStoreService.reloadTable$.next();
    }
    onSearch(): void {
       this.dialog.open(SearchUnsettleBillComponent, {})
        .afterClosed().subscribe(result => {
          if (result) {
            const filter = removeTenantNameInSearchResult(removeEmptyKeys(result));
            this.setState({
              ...this.state,
              table: {
                ...this.state.table,
                pageRequest: {
                  page: 1,
                  limit: this.dataStoreService.pageLimit,
                  filters: {
                    type: PAYMENT_CONFIG.filter.type.ADVANCESEARCHUNSETTLEBILL,
                    unsettleBillFilter:filter,
                  }
                }
              }
            });
            this.dataStoreService.reloadTable$.next();
          }
        });
    }
    onDisplayAllUnsettleBills(): void {
      this.setState({
        ...this.state,
        table: {
          ...this.state.table,
          pageRequest: {
            page: 1,
            limit: 10,
            filters: {
              type: PAYMENT_CONFIG.filter.type.ALLUNSETTLEBILLS
            }
          }
        }
      });
      this.dataStoreService.reloadTable$.next();
    }
    onAddUnsettleBill(): void {
        this.router.navigate(['payment/add-unsettle-bill']);
    }
    onUpdateUnsettleBill(objectId: string): void {
        this.router.navigate([`payment/update-unsettle-bill/${objectId}`]);
    }
    onDeleteUnsettleBill(objectId: string): void {
        this.modalService.confirmation('Remove Unsettled Bill','Are you sure you want to remove this unsettled bill?')
          .afterClosed().subscribe((remove) => {
              if(remove) {
                this.endpoint.removeUnsettleBill(objectId, this.dataStoreService.storeRequestStateUpdater)
                .pipe(
                  tap(
                    (unsettleBill) => {
                      this.dataStoreService.reloadTable$.next();
                      this.modalService.success(PAYMENT_CONFIG.action.deleteUnSettleBill, `Deleted unsettle bill in room number  ${unsettleBill.roomNumber}`);
                    },
                    () => {
                      this.modalService.error(PAYMENT_CONFIG.action.deleteUnSettleBill);
                    }
                  )
                )
                .subscribe();
              }
          });
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
          return this.endpoint.getUnsettleBills(this.state.table.pageRequest, this.dataStoreService.storeRequestStateUpdater);
        }),
       // map((pageData)=> modifyEntryObject(pageData)),
        tap((pageData) => {
          updateState(this, pageData);
        }),
        retry(1),
        takeUntil(this.destroy$)
      ).subscribe();
    }
}
