import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomRoutingModule } from './room-routing.module';
import { RoomHeaderComponent } from './components/room/room-header/room-header.component';
import { SharedModule } from '@gmrc-admin/shared';
import { ViewRoomComponent } from './views/view-room/view-room.component';
import { ViewTransientPrivateRoomComponent } from './views/view-transient-private-room/view-transient-private-room.component';
import { SearchTransientPrivateRoomComponent } from './modals/search-transient-private-room/search-transient-private-room.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ViewRoomFormComponent } from './views/view-room-form/view-room-form.component';
import { RoomFormComponent } from './components/room/room-form/room-form.component';
import { ActionResponseComponent } from '@gmrc-admin/shared/modals';
import { ViewTransientPrivateRoomFormComponent } from './views/view-transient-private-room-form/view-transient-private-room-form.component';
import { TransientPrivateRoomBodyComponent } from './components/transient-private-room/transient-private-room-body/transient-private-room-body.component';
import { TransientPrivateRoomHeaderComponent } from './components/transient-private-room/transient-private-room-header/transient-private-room-header.component';
import { TransientPrivateRoomFormComponent } from './components/transient-private-room/transient-private-room-form/transient-private-room-form.component';
import { ContainerTransientPrivateRoomFormComponent } from './container/container-transient-private-room-form/container-transient-private-room-form.component';
import { TransientPrivateRoomTenantFormComponent } from './components/transient-private-room/transient-private-room-tenant-form/transient-private-room-tenant-form.component';
import { ViewBedspaceRoomComponent } from './views/view-bedspace-room/view-bedspace-room.component';
import { ViewBedspaceRoomFormComponent } from './views/view-bedspace-room-form/view-bedspace-room-form.component';
@NgModule({
  declarations: [
    RoomHeaderComponent,
    ViewRoomComponent,
    ViewTransientPrivateRoomComponent,
    TransientPrivateRoomBodyComponent,
    TransientPrivateRoomHeaderComponent,
    SearchTransientPrivateRoomComponent,
    PaginatorComponent,
    ViewRoomFormComponent,
    RoomFormComponent,
    ViewTransientPrivateRoomFormComponent,
    TransientPrivateRoomFormComponent,
    ContainerTransientPrivateRoomFormComponent,
    TransientPrivateRoomTenantFormComponent,
    ViewBedspaceRoomComponent,
    ViewBedspaceRoomFormComponent,
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  entryComponents: [
    SearchTransientPrivateRoomComponent,
    ActionResponseComponent
  ]
})
export class RoomModule { }
