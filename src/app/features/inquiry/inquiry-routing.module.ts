import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InquiryFormComponent } from './components/inquiry-form/inquiry-form.component';
import { ViewInquiryListComponent } from './views/view-inquiry-list/view-inquiry-list.component';

const routes: Routes = [
  { path: '', component: ViewInquiryListComponent },
  { path: 'add', component: InquiryFormComponent },
  { path: 'update/:id', component: InquiryFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquiryRoutingModule { }
