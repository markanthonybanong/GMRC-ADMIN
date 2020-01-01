import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { ViewLoginComponent } from './views/view-login/view-login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '@gmrc-admin/shared';

@NgModule({
  declarations: [ViewLoginComponent, LoginFormComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class LoginModule { }
