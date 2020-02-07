import { Injectable } from '@angular/core';
import { Store } from 'rxjs-observable-store';
import { TenantFormStoreState } from './tenant-form.store.state';
import { TenantFormEndpoint } from './tenant-form.endpoint';
import { FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs/internal/operators/tap';
import { DataStoreService, ModalService } from '@gmrc-admin/shared/services';
import { getStoreRequestStateUpdater } from '@gmrc-admin/shared/helpers';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Tenant } from '../../../types/tenant/tenant';
import { TENANT_CONFIG } from '../../../tenant.config';
import { setTenantFormValues } from '../../../helpers/tenant/tenant-form/set-tenant-form-values';
import { MatDialog } from '@angular/material';
import { SelectTenantPhotoComponent } from '../../../modals/tenant/tenant-form/select-tenant-photo/select-tenant-photo.component';

@Injectable()
export class TenantFormStore extends Store<TenantFormStoreState> {
  public tenantForm = this.formBuilder.group({
    tenantImage: null,
    firstname: [null, Validators.required],
    middlename: null,
    lastname: [null, Validators.required],
    age: null,
    gender: null,
    typeOfNetwork: null,
    contactNumber: null,
    emergencyContactNumber: null,
    roomNumber: null,
    dueRentDate: null,
    address: null,
    _id: null,
  });
  public tenantImgHover: boolean;
  constructor(
    private endpoint: TenantFormEndpoint,
    private formBuilder: FormBuilder,
    private dataStoreService: DataStoreService,
    private modalService: ModalService,
    private router: Router,
    private dialog: MatDialog
    ) {
    super(new TenantFormStoreState());
  }
  onBack(): void {
    this.router.navigate(['tenant']);
  }
  onSubmit(): void {
    const tenant: Observable<Tenant> = this.state.isUpdate
                                       ? this.endpoint.updateTenant(this.tenantForm.value, this.dataStoreService.storeRequestStateUpdater)
                                       : this.endpoint.addTenant(this.tenantForm.value, this.dataStoreService.storeRequestStateUpdater);
    tenant
    .pipe(
      tap(
        (tenantFromServer) => {
          const title   = this.state.isUpdate
                          ? TENANT_CONFIG.action.updateTenant
                          : TENANT_CONFIG.action.addTenant;
          const content = this.state.isUpdate
                          ? `Updated ${tenantFromServer.firstname} ${tenantFromServer.middlename} ${tenantFromServer.lastname}`
                          : `Added ${tenantFromServer.firstname} ${tenantFromServer.middlename} ${tenantFromServer.lastname}`;
          this.modalService.success(title, content);
          this.setState({
            ...this.state,
            isUpdate: true,
          });
        },
        () => {
          this.modalService.error(this.state.isUpdate ? TENANT_CONFIG.action.updateTenant : TENANT_CONFIG.action.addTenant);
        }
      )
    )
    .subscribe();
  }
  onTenantImgMouseEnter(): void {
    this.tenantImgHover = true;
  }
  onTenantImgMouseLeave(): void {
    this.tenantImgHover = false;
  }
  onSelectPhoto(): void {
    this.dialog.open(SelectTenantPhotoComponent, {})
      .afterClosed().subscribe( result => {
        this.tenantForm.get('tenantImage').setValue(result.tenantImage);
      });
  }
  init(): void {
    this.dataStoreService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
    if (this.state.isUpdate) {
      this.getTenant();
    }
  }
  private getTenant(): void {
    this.endpoint.getTenant(this.state.pageRequest, this.dataStoreService.storeRequestStateUpdater)
    .pipe(
      tap((pageData) => {
        setTenantFormValues(this.tenantForm, pageData.data[0]);
      })
    )
    .subscribe();
  }
}
