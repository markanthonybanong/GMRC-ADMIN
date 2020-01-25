import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InquiryRoutingModule } from './inquiry-routing.module';
import { SharedModule } from '@gmrc-admin/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewInquiryComponent } from './views/view-inquiry/view-inquiry.component';
import { ViewInquiryFormComponent } from './views/view-inquiry-form/view-inquiry-form.component';
import { InquiryHeaderComponent } from './components/inquiry-header/inquiry-header.component';
import { ActionResponseComponent } from '@gmrc-admin/shared/modals';
import { SearchComponent } from './modals/search/search.component';
import { InquiryBodyComponent } from './components/inquiry-body/inquiry-body.component';
import { InquiryFormComponent } from './components/inquiry-form/inquiry-form.component';
@NgModule({
  declarations: [
    ViewInquiryComponent,
    ViewInquiryFormComponent,
    InquiryHeaderComponent,
    InquiryBodyComponent,
    InquiryFormComponent,
    SearchComponent,
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
     SearchComponent
  ]
})
export class InquiryModule { }
