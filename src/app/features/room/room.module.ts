import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomRoutingModule } from './room-routing.module';
import { RoomHeaderComponent } from './components/room-header/room-header.component';
import { SharedModule } from '@gmrc-admin/shared';
import { ViewRoomComponent } from './views/view-room/view-room.component';
import { ViewTransientPrivateRoomComponent } from './views/view-transient-private-room/view-transient-private-room.component';
import { TransientPrivateRoomBodyComponent } from './components/transient-private-room-body/transient-private-room-body.component';
import { TransientPrivateRoomHeaderComponent } from './components/transient-private-room-header/transient-private-room-header.component';
import { SearchTransientPrivateRoomComponent } from './modals/search-transient-private-room/search-transient-private-room.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ViewRoomFormComponent } from './views/view-room-form/view-room-form.component';

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
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  entryComponents: [
    SearchTransientPrivateRoomComponent
  ]
})
export class RoomModule { }
