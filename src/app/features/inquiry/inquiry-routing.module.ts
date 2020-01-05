import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InquiryListComponent } from './views/inquiry-list/inquiry-list.component';
import { InquiryFormComponent } from './views/inquiry-form/inquiry-form.component';


const routes: Routes = [
  { path: '', component: InquiryListComponent },
  { path: 'add', component: InquiryFormComponent },
  { path: 'update/:id', component: InquiryFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquiryRoutingModule { }
