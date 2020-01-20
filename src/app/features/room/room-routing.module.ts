import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewRoomComponent } from './views/view-room/view-room.component';
import { ViewTransientPrivateRoomComponent } from './views/view-transient-private-room/view-transient-private-room.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
