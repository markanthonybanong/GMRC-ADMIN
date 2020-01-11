import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Credential } from '../types/credential';
import { StoreRequestStateUpdater } from '@gmrc-admin/shared/types';
import { LOGIN_CONFIG } from '../login.configs';
import { tap} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService, AuthService } from '@gmrc-admin/shared/services';
import { UserType } from '../login.enums';
import { Token } from '@gmrc-admin/shared/types';
@Injectable()
export class LoginEndPoint {
  constructor(private apiService: ApiService, private authService: AuthService) {}
  login(credential: Credential, requestStateUpdater: StoreRequestStateUpdater): Observable<Token> {
    const request = credential.type === UserType.SuperAdmin
                    ? LOGIN_CONFIG.request.superAdminLogin
                    : LOGIN_CONFIG.request.adminLogin;
    requestStateUpdater(request.name, {inProgress: true});
    return this.authService.login(request.path, credential)
      .pipe(
        tap(
          (response) => {
          requestStateUpdater(request.name, {inProgress: false, success: true});
          return response;
          },
          (error: HttpErrorResponse) => {
            requestStateUpdater(request.name, {inProgress: false, error: true});
            return throwError(error);
          }
        ),
      );
  }
  createAdminPassword(sixDigitNumber: string, requestStateUpdater: StoreRequestStateUpdater): Observable<Credential> {
    const request = LOGIN_CONFIG.request.createAdminAccount;
    requestStateUpdater(request.name, {inProgress: true});
    return this.apiService.post<Credential>(request.path, {numberString: sixDigitNumber})
      .pipe(
        tap(
          (credential) => {
            requestStateUpdater(request.name, {inProgress: false, success: true});
            return credential;
          },
          (error: HttpErrorResponse) => {
            requestStateUpdater(request.name, {inProgress: false, error: true});
            return throwError(error);
          }
        ),
      );
  }
}
