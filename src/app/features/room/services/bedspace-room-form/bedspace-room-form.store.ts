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
import { FormBuilder, Validators } from '@angular/forms';
import { setBedspaceFormValues } from '../../helpers/bedspace-room-form/set-bedspace-form-values';
import { RequestResponse } from '@gmrc-admin/shared/enums';

@Injectable()
export class BedspaceRoomFormStore extends Store<BedspaceRoomFormStoreState> implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private searchTenantByName$: Subject<string> = new Subject<string>();
  public tenants: Array<Tenant>;
  public form = this.formBuilder.group({
    number: [null, Validators.required],
    floor: null,
    type: [null, Validators.required],
    aircon: null,
    _id: null,
  });
  constructor(
    private endpoint: BedspaceRoomFormEndpoint,
    private dataStoreService: DataStoreService,
    private formBuilder: FormBuilder
  ) {
    super(new BedspaceRoomFormStoreState());
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  get requestResponse(): object {
    return RequestResponse;
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
       setBedspaceFormValues(this.form, pageData.data[0]);
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
