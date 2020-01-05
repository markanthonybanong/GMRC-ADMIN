import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InquiryRoutingModule } from './inquiry-routing.module';
import { InquiryListComponent } from './views/inquiry-list/inquiry-list.component';
import { InquiryFormComponent } from './views/inquiry-form/inquiry-form.component';
import { SharedModule } from '@gmrc-admin/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [InquiryListComponent, InquiryFormComponent],
  imports: [
    CommonModule,
    InquiryRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class InquiryModule { }
