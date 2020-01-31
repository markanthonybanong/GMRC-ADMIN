import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { LoginModule } from './features/login/login.module';
import { InquiryModule } from './features/inquiry/inquiry.module';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthGuardService } from '@gmrc-admin/shared/services';
import { RoomModule } from './features/room/room.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


const routes: Routes = [
  { path: 'login', loadChildren: () => LoginModule },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'inquiry', loadChildren: () => InquiryModule, canActivate: [AuthGuardService] },
      { path: 'room', loadChildren: () => RoomModule, canActivate: [AuthGuardService] }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    NgxMaterialTimepickerModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
