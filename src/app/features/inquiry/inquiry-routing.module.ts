import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewListComponent } from './views/view-list/view-list.component';
import { ViewFormComponent } from './views/view-form/view-form.component';

const routes: Routes = [
  { path: '', component: ViewListComponent },
  { path: 'add', component: ViewFormComponent },
  { path: 'update/:id', component: ViewFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquiryRoutingModule { }
