import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewInquiryComponent } from './views/view-inquiry/view-inquiry/view-inquiry.component';
import { ViewInquiryFormComponent } from './views/view-inquiry/view-inquiry-form/view-inquiry-form.component';

const routes: Routes = [
  { path: '', component: ViewInquiryComponent },
  { path: 'add', component: ViewInquiryFormComponent },
  { path: 'update/:id', component: ViewInquiryFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquiryRoutingModule { }
