import { Injectable, OnDestroy } from '@angular/core';
import { Store } from 'rxjs-observable-store';
import { TenantStoreState } from './tenant.store.state';
import { Subject } from 'rxjs';
import { DataStoreService } from '@gmrc-admin/shared/services';
import { getStoreRequestStateUpdater, updateState, removeEmptyKeys } from '@gmrc-admin/shared/helpers';
import { switchMap, tap, retry, takeUntil } from 'rxjs/operators';
import { TenantEndpoint } from './tenant.endpoint';
import { PageEvent, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TENANT_CONFIG } from '../../../tenant.config';
import { SearchTenantComponent } from '../../../modals/tenant/tenant/search-tenant/search-tenant.component';

@Injectable()
export class TenantStore extends Store<TenantStoreState> implements OnDestroy{
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private dataStoreService: DataStoreService,
    private endpoint: TenantEndpoint,
    private dialog: MatDialog,
    private router: Router
  ) {
    super(new TenantStoreState());
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  init(): void {
    this.dataStoreService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
    this.initReloadTenants$();
    this.dataStoreService.reloadTable$.next();
  }
  onSearch(): void {
    const dialogRef = this.dialog.open(SearchTenantComponent, {
      data: {
        title: TENANT_CONFIG.action.searchTenant
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.setState({
          ...this.state,
          table: {
            ...this.state.table,
            pageRequest: {
              ...this.state.table.pageRequest,
              filters: {
                type: TENANT_CONFIG.filter.type.ADVANCESEARCHTENANT,
                tenantFilter: removeEmptyKeys(result),
              }
            }
          }
        });
        this.dataStoreService.reloadTable$.next();
      }
    });
  }
  onDisplayAllTenants(): void {
    this.setState({
      ...this.state,
      table: {
        ...this.state.table,
        pageRequest: {
          page: 1,
          limit: 10,
          filters: {
            type: TENANT_CONFIG.filter.type.ALLTENANTS,
          }
        }
      }
    });
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
  onAddTenant(): void {
    this.router.navigate(['tenant/add']);
  }
  onUpdateTenant(tenantObjId: string): void {
    this.router.navigate([`tenant/update/${tenantObjId}`]);
  }

  private initReloadTenants$(): void {
    this.dataStoreService.reloadTable$
      .pipe(
        switchMap(() => {
          return this.endpoint.tenants(this.state.table.pageRequest, this.dataStoreService.storeRequestStateUpdater);
        }),
        tap((pageData) => {
         updateState(this, pageData);
        }),
        retry(1),
        takeUntil(this.destroy$)
      ).subscribe();
  }
}
