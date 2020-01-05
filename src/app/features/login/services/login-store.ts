
import { Injectable, OnDestroy } from '@angular/core';
import {Store} from 'rxjs-observable-store';
import { LoginStoreState } from './login-store-state';
import { UserType } from '../login.constants';
import { Credential } from '../types/credential';
import { StoreRequestStateUpdater } from '@gmrc-admin/shared/types';
import { getStoreRequestStateUpdater } from '@gmrc-admin/shared/helpers';
import { LoginEndPoint } from './login-end-point';
import { tap } from 'rxjs/internal/operators/tap';
import { NumberService, LocalStorageService } from '@gmrc-admin/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class LoginStore  extends Store<LoginStoreState> implements OnDestroy{
  private userType: string = UserType.SuperAdmin;
  private createdAdminPassword: string = null;
  private storeRequestStateUpdater: StoreRequestStateUpdater;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private endpoint: LoginEndPoint,
    private localStorageService: LocalStorageService,
    private numberService: NumberService,
    private router: Router,
  ) {
    super(new  LoginStoreState());
  }
  init(): void {
    this.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
  }
  setUserType(type: string): void {
    this.userType = type;
  }
  get buttonName(): string {
    return this.userType === UserType.SuperAdmin && this.state.superAdminLogin === false
           ? 'Next' : 'Log In';
  }
  onLogin(credential: Credential): void {
    const loginSuperAdmin: boolean = this.userType === UserType.SuperAdmin && this.state.superAdminLogin === false;
    const loginAdmin: boolean      = this.userType === UserType.Admin && this.state.adminLogin === false;
    if (this.state.superAdminLogin && this.userType === UserType.SuperAdmin ) {
      this.router.navigate(['/inquiry']);
    } else if (loginSuperAdmin) {
      this.endpoint.loginSuperAdmin(credential, this.storeRequestStateUpdater)
        .pipe(
          tap(() => {
             this.setState({...this.state, superAdminLogin: true});
            },
          ),
         takeUntil(this.destroy$)
        )
        .subscribe();
    } else if (loginAdmin) {
      this.endpoint.loginAdmin(credential, this.storeRequestStateUpdater)
        .pipe(
          tap((response) => {
            this.localStorageService.setItem('token', response.token);
            this.localStorageService.setItem('tokenExp', response.tokenExp);
            this.router.navigate(['/inquiry']);
            }
          ),
         takeUntil(this.destroy$)
        )
        .subscribe();
    }
  }
  onCreateAdminPassword(): void {
    const password = this.numberService.generateSixDigitNumber.toString();
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
