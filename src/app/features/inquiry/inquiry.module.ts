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
import { ActionResponseComponent } from '@gmrc-admin/shared/modals';
import { ErrorResponseDirective } from '@gmrc-admin/shared/directives';
@NgModule({
  declarations: [
    ViewListComponent,
    ViewFormComponent,
    ListHeaderComponent,
    ListBodyComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    InquiryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  entryComponents: [
     ActionResponseComponent
  ]
})
export class InquiryModule { }
