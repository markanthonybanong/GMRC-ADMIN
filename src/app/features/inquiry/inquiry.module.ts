import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InquiryRoutingModule } from './inquiry-routing.module';
import { SharedModule } from '@gmrc-admin/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewInquiryComponent } from './views/view-inquiry/view-inquiry/view-inquiry.component';
import { ViewInquiryFormComponent } from './views/view-inquiry/view-inquiry-form/view-inquiry-form.component';
import { ActionResponseComponent } from '@gmrc-admin/shared/modals';
import { InquiryHeaderComponent } from './components/inquiry/inquiry-header/inquiry-header.component';
import { InquiryTableComponent } from './components/inquiry/inquiry-table/inquiry-table.component';
import { InquiryFormComponent } from './components/inquiry/inquiry-form/inquiry-form.component';
import { SearchInquiryComponent } from './modals/inquiry/search-inquiry/search-inquiry.component';
import { ContainerInquiryComponent } from './containers/container-inquiry/container-inquiry/container-inquiry.component';
import { ContainerInquiryFormComponent } from './containers/container-inquiry/container-inquiry-form/container-inquiry-form.component';

@NgModule({
  declarations: [
    ViewInquiryComponent,
    ViewInquiryFormComponent,
    InquiryHeaderComponent,
    InquiryTableComponent,
    InquiryFormComponent,
    SearchInquiryComponent,
    ContainerInquiryComponent,
    ContainerInquiryFormComponent,
  ],
  imports: [
    CommonModule,
    InquiryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  entryComponents: [
     ActionResponseComponent,
     SearchInquiryComponent
  ]
})
export class InquiryModule { }
