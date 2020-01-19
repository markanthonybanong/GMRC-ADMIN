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
import { SearchComponent } from './modals/search/search.component';
@NgModule({
  declarations: [
    ViewListComponent,
    ViewFormComponent,
    ListHeaderComponent,
    ListBodyComponent,
    FormComponent,
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
