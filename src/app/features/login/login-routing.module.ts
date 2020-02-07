import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewLoginComponent } from './views/view-login/view-login/view-login.component';

const routes: Routes = [
  {
    path: '',
    component: ViewLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
