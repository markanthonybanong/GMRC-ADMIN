import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { ViewLoginComponent } from './views/view-login/view-login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '@gmrc-admin/shared';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [ViewLoginComponent, LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class LoginModule { }
