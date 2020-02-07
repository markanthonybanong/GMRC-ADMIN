import { Injectable  } from '@angular/core';
import { Store } from 'rxjs-observable-store';
import { TransientPrivateRoomFormStoreState } from './transient-private-room-form.store.state';
import { DataStoreService, DataRoomService, ModalService } from '@gmrc-admin/shared/services';
import { getStoreRequestStateUpdater  } from '@gmrc-admin/shared/helpers';
import { TransientPrivateRoomFormEndpoint } from './transient-private-room-form.endpoint';
import { tap } from 'rxjs/operators';
import { Validators, FormBuilder } from '@angular/forms';
import { setTransientPrivateFormValues } from '../../../helpers/transient-private-room/transient-private-room-form/set-transient-private-form-values';
import { Router } from '@angular/router';
import { getTenantsInTenantForm } from '../../../helpers/transient-private-room/transient-private-room-form/get-tenants-in-tenant-form';
import { createTransientPrivateTenant } from '../../../helpers/transient-private-room/transient-private-room-form/create-transient-private-tenant';
import { ROOM_CONFIG } from '../../../room.config';
import { getTenantFormGroupInTenantForm } from '../../../helpers/transient-private-room/transient-private-room-form/get-tenant-form-group-in-tenant-form';
import { SetTenantObjectId } from '../../../types/transient-private-room-tenant-form/set-tenant-object-id';
import { setTenantFormValues } from '../../../helpers/transient-private-room/transient-private-room-form/set-tenant-form-values';
import { getAddedTenantObjectdIds } from '../../../helpers/get-added-tenant-objectd-ids';
@Injectable()
export class TransientPrivateRoomFormStore extends Store<TransientPrivateRoomFormStoreState> {
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
    private dataRoomService: DataRoomService,
    private endpoint: TransientPrivateRoomFormEndpoint,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: ModalService
  ) {
    super (new TransientPrivateRoomFormStoreState());
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
  onRemoveTenant(tenantIndex: number): void {
    if (getTenantFormGroupInTenantForm(this.tenantForm, tenantIndex).get('isAdded').value) {
      const tenantName = getTenantFormGroupInTenantForm(this.tenantForm, tenantIndex).get('name').value;
      this.modalService.confirmation(ROOM_CONFIG.action.removeTenant, `Remove ${tenantName}?`)
      .afterClosed().subscribe(isRemove => {
        const data = {
          roomObjectId: this.form.get('_id').value,
          tenantObjectId: getTenantFormGroupInTenantForm(this.tenantForm, tenantIndex).get('tenantObjectId').value
        };
        if (isRemove) {
           this.endpoint.removeTenant(data, this.dataStoreService.storeRequestStateUpdater)
            .pipe(
              tap(
                () => {
                  getTenantsInTenantForm(this.tenantForm).removeAt(tenantIndex);
                },
                () => {
                  this.modalService.error(ROOM_CONFIG.action.removeTenant);
                }
              )
            ).subscribe();
        }
      });
    } else {
      getTenantsInTenantForm(this.tenantForm).removeAt(tenantIndex);
    }
  }
  onTenantFormSubmit(tenantIndex: number): void {
    const tenant = {
      roomObjectId: this.form.get('_id').value,
      tenantObjectId: getTenantFormGroupInTenantForm(this.tenantForm, tenantIndex).get('tenantObjectId').value
    };
    this.setState({
      ...this.state,
      requests: {
        ...this.state.requests,
        submit: {
          inProgress: true,
        }
      }
    });
    this.dataRoomService.getAllRooms
      .pipe(
        tap(
          (pageData) => {
          if (tenant.tenantObjectId === null || getAddedTenantObjectdIds(pageData.data).includes(tenant.tenantObjectId)) {
            const msg = tenant.tenantObjectId === null
                            ? `Select tenant`
                            : `${getTenantFormGroupInTenantForm(this.tenantForm, tenantIndex).get('name').value} already added`;
            this.setState({
              ...this.state,
              requests: {
                ...this.state.requests,
                submit: {
                  inProgress: false,
                }
              }
            });
            this.modalService.warn(ROOM_CONFIG.action.addTenant, msg);
          } else {
            this.endpoint.addTenant(tenant, this.dataStoreService.storeRequestStateUpdater)
              .pipe(
                tap(
                  () => {
                    getTenantFormGroupInTenantForm(this.tenantForm, tenantIndex).get('isAdded').setValue(true);
                    const content = `Added ${getTenantFormGroupInTenantForm(this.tenantForm, tenantIndex).get('name').value}`;
                    this.modalService.success(ROOM_CONFIG.action.addTenant, content);
                  },
                  () => {
                    this.modalService.error(ROOM_CONFIG.action.addTenant);
                  }
                )
              ).subscribe();
          }
          },
          () => {
            this.setState({
              ...this.state,
              requests: {
                ...this.state.requests,
                submit: {
                  inProgress: false,
                }
              }
            });
            this.modalService.error(ROOM_CONFIG.action.addTenant);
          }
        ),
      ).subscribe();
  }
  onTenantClick(data: SetTenantObjectId): void {
    getTenantFormGroupInTenantForm(this.tenantForm, data.index).get('tenantObjectId').patchValue(data.tenantObjectId);
  }
  onRoomFormSubmit(): void {
    this.endpoint.updateRoom(this.form.value, this.dataStoreService.storeRequestStateUpdater)
      .pipe(
        tap(
          (room) => {
            this.modalService.success(ROOM_CONFIG.action.update, `Updated room ${room.number}`);
          },
          () => {
            this.modalService.error(ROOM_CONFIG.action.update);
          }
        )
      ).subscribe();
  }
  private getRoom(): void {
    this.endpoint.getRooms(this.state.pageRequest, this.dataStoreService.storeRequestStateUpdater)
      .pipe(
        tap((pageData) => {
          setTransientPrivateFormValues(this.form, pageData.data[0]);
          setTenantFormValues(this.tenantForm, pageData.data[0].roomProperties[0].tenants);
        })
      )
      .subscribe();
  }

}
