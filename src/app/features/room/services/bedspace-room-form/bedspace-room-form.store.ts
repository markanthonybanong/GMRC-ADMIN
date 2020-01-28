import { Injectable, OnDestroy } from '@angular/core';
import { BedspaceRoomEndpoint } from '../bedspace-room/bedspace-room.endpoint';
import { BedspaceRoomFormStoreState } from './bedspace-room-form.store.state';
import { Store } from 'rxjs-observable-store';
import { Subject } from 'rxjs';
import { DataStoreService } from '@gmrc-admin/shared/services';
import { getStoreRequestStateUpdater } from '@gmrc-admin/shared/helpers';
import { switchMap, debounceTime, takeUntil, tap } from 'rxjs/operators';
import { Tenant } from 'src/app/features/tenant/types/tenant';
import { BedspaceRoomFormEndpoint } from './bedspace-room-form.endpoint';

@Injectable()
export class BedspaceRoomFormStore extends Store<BedspaceRoomFormStoreState> implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private searchTenantByName$: Subject<string> = new Subject<string>();
  public tenants: Array<Tenant>;
  constructor(
    private endpoint: BedspaceRoomFormEndpoint,
    private dataStoreService: DataStoreService
  ) {
    super(new BedspaceRoomFormStoreState());
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  init(): void {
    this.dataStoreService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
    this.searchTenants$();
    this.getRoom();
  }
  private getRoom(): void {
    this.endpoint.getRooms(this.state.pageRequest, this.dataStoreService.storeRequestStateUpdater)
    .pipe(
      tap((pageData) => {
       console.log('page data ', pageData);
       // setTenantFormValues(this.tenantForm, pageData.data[0].roomProperties[0].tenants);
      }),
      takeUntil(this.destroy$)
    )
    .subscribe();
  }
  private searchTenants$(): void {
    this.searchTenantByName$
      .pipe(
        switchMap(() => this.endpoint.getTenants(this.state.pageRequest, this.dataStoreService.storeRequestStateUpdater)),
        debounceTime(800),
        takeUntil(this.destroy$)
      ).subscribe((pageData) => {
        this.tenants = pageData.data;
      });
  }
}
