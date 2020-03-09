import { Injectable, OnDestroy } from '@angular/core';
import { EntryStoreState } from './entry.store.state';
import { Store } from 'rxjs-observable-store';
import { EntryEndpoint } from './entry.endpoint';
import { DataStoreService } from '@gmrc-admin/shared/services';
import { switchMap, tap, retry, takeUntil, map } from 'rxjs/operators';
import { updateState, getStoreRequestStateUpdater, removeEmptyKeys, removeTenantNameInSearchResult } from '@gmrc-admin/shared/helpers';
import { Subject } from 'rxjs';
import { MatDialog, PageEvent } from '@angular/material';
import { SearchEntryComponent } from '../../../modals/entry/search-entry/search-entry.component';
import { PAYMENT_CONFIG } from '../../../payment.config';
import { Router } from '@angular/router';
import { modifyEntryObject } from '../../../helpers/entry/entry/modify-entry-object';

@Injectable()
export class EntryStore extends Store<EntryStoreState> implements OnDestroy {
  public tableName = 'Entry';
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private endpoint: EntryEndpoint,
    private dataStoreService: DataStoreService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    super ( new EntryStoreState());
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
     this.dialog.open(SearchEntryComponent, {})
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
                  type: PAYMENT_CONFIG.filter.type.ADVANCESEARCHENTRY,
                  entryFilter:filter,
                }
              }
            }
          });
          this.dataStoreService.reloadTable$.next();
        }
      });
  }
  onDisplayAllEntries(): void {
    this.setState({
      ...this.state,
      table: {
        ...this.state.table,
        pageRequest: {
          page: 1,
          limit: 10,
          filters: {
            type: PAYMENT_CONFIG.filter.type.ALLENTRIES
          }
        }
      }
    });
    this.dataStoreService.reloadTable$.next();
  }
  onAddEntry(): void {
    this.router.navigate(['payment/add-entry']);
  }
  onUpdateEntry(entryObjId: string): void {
    this.router.navigate([`payment/update-entry/${entryObjId}`]);
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
        return this.endpoint.getEntries(this.state.table.pageRequest, this.dataStoreService.storeRequestStateUpdater);
      }),
      map((pageData)=> modifyEntryObject(pageData)),
      tap((pageData) => {
        updateState(this, pageData);
      }),
      retry(1),
      takeUntil(this.destroy$)
    ).subscribe();
  }
}
