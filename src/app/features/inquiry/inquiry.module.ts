import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InquiryRoutingModule } from './inquiry-routing.module';
import { SharedModule } from '@gmrc-admin/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewListComponent } from './views/view-list/view-list.component';
import { ViewFormComponent } from './views/view-form/view-form.component';
import { ListHeaderComponent } from './components/list-header/list-header.component';
import { ListBodyComponent } from './components/list-body/list-body.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [
    ViewListComponent,
    ViewFormComponent,
    ListHeaderComponent,
    ListBodyComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    InquiryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class InquiryModule { }
