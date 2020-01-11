import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { ViewFormComponent } from './views/view-form/view-form.component';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '@gmrc-admin/shared';

@NgModule({
  declarations: [ViewFormComponent, FormComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class LoginModule { }
