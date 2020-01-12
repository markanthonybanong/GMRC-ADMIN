
import { Injectable, OnDestroy } from '@angular/core';
import {Store} from 'rxjs-observable-store';
import { UserType } from '../login.enums';
import { Credential } from '../types/credential';
import { StoreRequestStateUpdater } from '@gmrc-admin/shared/types';
import { getStoreRequestStateUpdater } from '@gmrc-admin/shared/helpers';
import { tap } from 'rxjs/internal/operators/tap';
import { generateSixDigitNumber } from '@gmrc-admin/shared/helpers';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FormStoreState } from './form.store.state';
import { FormEndpoint } from './form.endpoint';

@Injectable()
export class FormStore  extends Store<FormStoreState> implements OnDestroy{
  private userType: string = UserType.SuperAdmin;
  private createdAdminPassword: string = null;
  private storeRequestStateUpdater: StoreRequestStateUpdater;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  form = this.formBuilder.group({
    type: [UserType.SuperAdmin, Validators.required],
    password: [null, Validators.required]
  });

  constructor(
    private endpoint: FormEndpoint,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    super(new  FormStoreState());
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
            },
          ),
          takeUntil(this.destroy$)
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
