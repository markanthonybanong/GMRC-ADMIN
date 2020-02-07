import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { ViewLoginComponent } from './views/view-login/view-login/view-login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '@gmrc-admin/shared';
import { LoginComponent } from './components/login/login/login.component';
import { LoginDisplayServerResponseComponent } from './components/login/login-display-server-response/login-display-server-response.component';
import { ContainerLoginComponent } from './containers/container-login/container-login/container-login.component';



@NgModule({
  declarations: [ViewLoginComponent, LoginComponent, LoginDisplayServerResponseComponent, ContainerLoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class LoginModule { }
