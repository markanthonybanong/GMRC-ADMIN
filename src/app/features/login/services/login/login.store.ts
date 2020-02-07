
import { Injectable } from '@angular/core';
import {Store} from 'rxjs-observable-store';
import { UserType } from '../../login.enums';
import { Credential } from '../../types/login/credential';
import { StoreRequestStateUpdater } from '@gmrc-admin/shared/types';
import { getStoreRequestStateUpdater } from '@gmrc-admin/shared/helpers';
import { tap } from 'rxjs/internal/operators/tap';
import { generateSixDigitNumber } from '@gmrc-admin/shared/helpers';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginStoreState } from './login.store.state';
import { LoginEndpoint } from './login.endpoint';

@Injectable()
export class LoginStore  extends Store<LoginStoreState>{
  private userType: string = UserType.SuperAdmin;
  private createdAdminPassword: string = null;
  private storeRequestStateUpdater: StoreRequestStateUpdater;
  loginForm = this.formBuilder.group({
    type: [UserType.SuperAdmin, Validators.required],
    password: [null, Validators.required]
  });

  constructor(
    private endpoint: LoginEndpoint,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    super(new  LoginStoreState());
  }
  init(): void {
    this.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
  }
  onUserTypeChange(type: string): void {
    this.userType = type;
  }
  // TODO: find a way to separate this
  get buttonName(): string {
    return this.userType === UserType.SuperAdmin && this.state.superAdminLogin === false
           ? 'Next' : 'Log In';
  }
  onLogin(credential: Credential): void {
    if (this.state.superAdminLogin && this.userType === UserType.SuperAdmin ) {
      this.router.navigate(['/inquiry']);
    } else {
      this.endpoint.login(credential, this.storeRequestStateUpdater)
        .pipe(
          tap(() => {
            if (credential.type === UserType.SuperAdmin) {
              this.setState({...this.state, superAdminLogin: true});
            } else {
              this.router.navigate(['/inquiry']);
            }
          })
        )
        .subscribe();
    }
  }
  onCreateAdminPassword(): void {
    const password = generateSixDigitNumber().toString();
    this.endpoint.createAdminPassword(
      password,
      this.storeRequestStateUpdater
    ).pipe(
      tap(
        () => {
         this.createdAdminPassword = password;
        }
      )
    )
    .subscribe();
  }
}
