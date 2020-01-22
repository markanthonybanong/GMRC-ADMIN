import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewRoomComponent } from './views/view-room/view-room.component';
import { ViewTransientPrivateRoomComponent } from './views/view-transient-private-room/view-transient-private-room.component';
import { ViewRoomFormComponent } from './views/view-room-form/view-room-form.component';
import { ViewTransientPrivateRoomFormComponent } from './views/view-transient-private-room-form/view-transient-private-room-form.component';

const routes: Routes = [
  {
    path: '',
    component: ViewRoomComponent,
    children: [
      { path: '', redirectTo: 'private-transient', pathMatch: 'full' },
      { path: 'private-transient', component:  ViewTransientPrivateRoomComponent },
      // { path: 'bedspace', component: BedspaceComponent },
      // { path: 'unsettle-bill', component: UnsettleBillComponent}
    ]
  },
  { path: 'add', component: ViewRoomFormComponent },
  { path: 'update-private-transient/:id', component: ViewTransientPrivateRoomFormComponent },
  // { path: 'update-bedspace/:id', component: BedspaceFormComponent },
  // { path: 'unsettle-bill/add', component: UnsettleBillFormComponent },
  // { path: 'update-unsettle-bill/:id', component: UnsettleBillFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
