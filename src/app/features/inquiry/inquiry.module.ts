import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InquiryRoutingModule } from './inquiry-routing.module';
import { SharedModule } from '@gmrc-admin/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewInquiryListComponent } from './views/view-inquiry-list/view-inquiry-list.component';
import { InquiryFormComponent } from './components/inquiry-form/inquiry-form.component';
import { InquiryListHeaderComponent } from './components/inquiry-list-header/inquiry-list-header.component';
import { InquiryListBodyComponent } from './components/inquiry-list-body/inquiry-list-body.component';

@NgModule({
  declarations: [
    ViewInquiryListComponent,
    InquiryFormComponent,
    InquiryListHeaderComponent,
    InquiryListBodyComponent
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
