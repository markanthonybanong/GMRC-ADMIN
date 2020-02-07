import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomRoutingModule } from './room-routing.module';
import { RoomHeaderComponent } from './components/room/room-header/room-header.component';
import { SharedModule } from '@gmrc-admin/shared';
import { ViewRoomComponent } from './views/view-room/view-room/view-room.component';
import { ViewTransientPrivateRoomComponent } from './views/view-transient-private-room/view-transient-private-room/view-transient-private-room.component';
import { SearchTransientPrivateRoomComponent } from './modals/transient-private-room/search-transient-private-room/search-transient-private-room.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewRoomFormComponent } from './views/view-room/view-room-form/view-room-form.component';
import { RoomFormComponent } from './components/room/room-form/room-form.component';
import { ViewTransientPrivateRoomFormComponent } from './views/view-transient-private-room/view-transient-private-room-form/view-transient-private-room-form.component';
import { TransientPrivateRoomTableComponent } from './components/transient-private-room/transient-private-room-table/transient-private-room-table.component';
import { TransientPrivateRoomFormComponent } from './components/transient-private-room/transient-private-room-form/transient-private-room-form.component';
import { TransientPrivateRoomTenantFormComponent } from './components/transient-private-room/transient-private-room-tenant-form/transient-private-room-tenant-form.component';
import { ViewBedspaceRoomComponent } from './views/view-bedspace-room/view-bedspace-room/view-bedspace-room.component';
import { ViewBedspaceRoomFormComponent } from './views/view-bedspace-room/view-bedspace-room-form/view-bedspace-room-form.component';
import { SearchBedspaceRoomComponent } from './modals/bedspace-room/search-bedspace-room/search-bedspace-room.component';
import { BedspaceRoomFormComponent } from './components/bedspace-room/bedspace-room-form/bedspace-room-form.component';
import { BedspaceBedFormComponent } from './components/bedspace-room/bedspace-bed-form/bedspace-bed-form.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { RoomTableHeaderComponent } from './components/room-table-header/room-table-header.component';
import { BedspaceRoomTableComponent } from './components/bedspace-room/bedspace-room-table/bedspace-room-table.component';
import { ContainerTransientPrivateRoomFormComponent } from './container/container-transient-private-room/container-transient-private-room-form/container-transient-private-room-form.component';
import { ContainerBedspaceRoomFormComponent } from './container/container-bedspace-room/container-bedspace-room-form/container-bedspace-room-form.component';
import { ContainerRoomComponent } from './container/container-room/container-room/container-room.component';
import { ContainerTransientPrivateRoomComponent } from './container/container-transient-private-room/container-transient-private-room/container-transient-private-room.component';
import { ContainerBedspaceRoomComponent } from './container/container-bedspace-room/container-bedspace-room/container-bedspace-room.component';

@NgModule({
  declarations: [
    RoomTableHeaderComponent,
    RoomHeaderComponent,
    ViewRoomComponent,
    ViewTransientPrivateRoomComponent,
    TransientPrivateRoomTableComponent,
    SearchTransientPrivateRoomComponent,
    ViewRoomFormComponent,
    RoomFormComponent,
    ViewTransientPrivateRoomFormComponent,
    TransientPrivateRoomFormComponent,
    ContainerTransientPrivateRoomFormComponent,
    TransientPrivateRoomTenantFormComponent,
    ViewBedspaceRoomComponent,
    ViewBedspaceRoomFormComponent,
    BedspaceRoomTableComponent,
    SearchBedspaceRoomComponent,
    ContainerBedspaceRoomFormComponent,
    BedspaceRoomFormComponent,
    BedspaceBedFormComponent,
    ContainerRoomComponent,
    ContainerTransientPrivateRoomComponent,
    ContainerBedspaceRoomComponent,
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgxMaterialTimepickerModule
  ],
  entryComponents: [
    SearchTransientPrivateRoomComponent,
    SearchBedspaceRoomComponent,
  ]
})
export class RoomModule { }
