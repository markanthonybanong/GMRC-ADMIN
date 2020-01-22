import { Injectable, OnDestroy } from '@angular/core';
import { Store } from 'rxjs-observable-store';
import { TransientPrivateRoomFormStoreState } from './transient-private-room-form.store.state';
import { Subject } from 'rxjs';
import { DataStoreService } from '@gmrc-admin/shared/services';
import { getStoreRequestStateUpdater } from '@gmrc-admin/shared/helpers';
import { TransientPrivateRoomFormEndpoint } from './transient-private-room-form.endpoint';
import {  tap, takeUntil } from 'rxjs/operators';
import { Validators, FormBuilder } from '@angular/forms';
import { setTransientPrivateFormValues } from '../../helpers/transient-private-room-form/set-transient-private-form-values';
import { Router } from '@angular/router';
import { getTenantsInTenantForm } from '../../helpers/transient-private-room-form/get-tenants-in-tenant-form';
import { createTransientPrivateTenant } from '../../helpers/transient-private-room-form/create-transient-private-tenant';

@Injectable()
export class TransientPrivateRoomFormStore extends Store<TransientPrivateRoomFormStoreState> implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public form = this.formBuilder.group({
    number: [{value: null, disabled: true}, Validators.required],
    floor: null,
    type: [null, Validators.required],
    aircon:  null,
    roomProperties: this.formBuilder.array([]),
    _id: null,
  });
  public tenantForm = this.formBuilder.group({
    tenants: this.formBuilder.array([]),
  });

  constructor(
    private dataStoreService: DataStoreService,
    private endpoint: TransientPrivateRoomFormEndpoint,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    super (new TransientPrivateRoomFormStoreState());
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  init(): void {
    this.dataStoreService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
    this.getRoom();
  }
  onAddTenant(): void {
    getTenantsInTenantForm(this.tenantForm).push(createTransientPrivateTenant());
  }
  onBack(): void {
    this.router.navigate(['room/private-transient']);
  }
  onSearchTenant(name: string): void {

  }
  private getRoom(): void {
    this.endpoint.room(this.state.pageRequest, this.dataStoreService.storeRequestStateUpdater)
      .pipe(
        tap((pageData) => {
          setTransientPrivateFormValues(this.form, pageData.data[0]);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
