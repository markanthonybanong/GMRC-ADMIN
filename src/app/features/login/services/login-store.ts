
import { Injectable } from '@angular/core';
import { UserInput } from '../types/user-input';
import {Store} from 'rxjs-observable-store';
import { LoginStoreState } from './login-store-state';
import { UserType } from '../login.constants';
import { Credential } from '../types/credential';


@Injectable()
export class LoginStore  extends Store<LoginStoreState>{
  userType: string = UserType.SuperAdmin;
  constructor() {
    super(new  LoginStoreState());
  }
  setUserType(type: string): void {
    this.userType = type;
  }
  get buttonName(): string {
    return this.userType === UserType.SuperAdmin && this.state.superAdminLogin === false
           ? 'Next' : 'Log In';
  }
  onLogin(credential: Credential): void {
    console.log('hey boiii ', credential);
  }


}
