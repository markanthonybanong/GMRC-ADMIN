
import { Injectable } from '@angular/core';
import {Store} from 'rxjs-observable-store';
import { LoginStoreState } from './login-store-state';
import { UserType } from '../login.constants';
import { Credential } from '../types/credential';
import { StoreRequestStateUpdater } from '@gmrc-admin/shared/types';
import { getStoreRequestStateUpdater } from '@gmrc-admin/shared/helpers';
import { LoginEndPoint } from './login-end-point';



@Injectable()
export class LoginStore  extends Store<LoginStoreState>{
  private userType: string = UserType.SuperAdmin;
  private storeRequestStateUpdater: StoreRequestStateUpdater;
  constructor(private endpoint: LoginEndPoint) {
    super(new  LoginStoreState());
  }
  init(): void {
    this.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
  }
  setUserType(type: string): void {
    this.userType = type;
  }
  get buttonName(): string {
    return this.userType === UserType.SuperAdmin && this.state.requests.login.success === false
           ? 'Next' : 'Log In';
  }
  onLogin(credential: Credential): void {
    const superAdminNotYetLogin: boolean = this.userType === UserType.SuperAdmin && this.state.requests.login.success === false;
    const adminNotYetLogin: boolean      = this.userType === UserType.Admin && this.state.requests.login.success === false;
    if (superAdminNotYetLogin || adminNotYetLogin ) {
      this.endpoint.login(credential, this.storeRequestStateUpdater)
        .subscribe((token) => {
          console.log(token);
        });
    }
  }



}
