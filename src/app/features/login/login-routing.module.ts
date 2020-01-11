import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewFormComponent } from './views/view-form/view-form.component';


const routes: Routes = [
  {
    path: '',
    component: ViewFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
