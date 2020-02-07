import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantRoutingModule } from './tenant-routing.module';
import { ViewTenantComponent } from './views/view-tenant/view-tenant/view-tenant.component';
import { ViewTenantFormComponent } from './views/view-tenant/view-tenant-form/view-tenant-form.component';
import { TenantHeaderComponent } from './components/tenant/tenant-header/tenant-header.component';
import { SharedModule } from '@gmrc-admin/shared';
import { TenantTableComponent } from './components/tenant/tenant-table/tenant-table.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TenantFormComponent } from './components/tenant/tenant-form/tenant-form.component';
import { ContainerTenantComponent } from './containers/container-tenant/container-tenant/container-tenant.component';
import { ContainerTenantFormComponent } from './containers/container-tenant/container-tenant-form/container-tenant-form.component';
import { SearchTenantComponent } from './modals/tenant/tenant/search-tenant/search-tenant.component';
import { SelectTenantPhotoComponent } from './modals/tenant/tenant-form/select-tenant-photo/select-tenant-photo.component';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [
    ViewTenantComponent,
    ViewTenantFormComponent,
    TenantHeaderComponent,
    TenantTableComponent,
    SearchTenantComponent,
    TenantFormComponent,
    ContainerTenantComponent,
    ContainerTenantFormComponent,
    SelectTenantPhotoComponent],
  imports: [
    CommonModule,
    TenantRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ImageCropperModule
  ],
  entryComponents: [
    SearchTenantComponent,
    SelectTenantPhotoComponent
  ]
})
export class TenantModule { }
