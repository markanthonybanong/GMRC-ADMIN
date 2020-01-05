import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Credential } from '../types/credential';
import { StoreRequestStateUpdater } from '@gmrc-admin/shared/types';
import { LOGIN_CONFIG } from '../login.configs';
import { Token } from '../types/token';
import {map, catchError, tap} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '@gmrc-admin/core';
@Injectable()
export class LoginEndPoint {
  constructor(private apiService: ApiService) {}
  loginSuperAdmin(credential: Credential, requestStateUpdater: StoreRequestStateUpdater): Observable<Token> {
    const request = LOGIN_CONFIG.request.superAdminLogin;
    requestStateUpdater(request.name, {inProgress: true});
    return this.apiService.post<Token>(request.path, credential)
      .pipe(
        tap(token => {
          requestStateUpdater(request.name, {inProgress: false, success: true});
          return token;
        }),
        catchError( (error: HttpErrorResponse) => {
          requestStateUpdater(request.name, {inProgress: false, error: true});
          return throwError(error);
        })
      );
  }
  loginAdmin(credential: Credential, requestStateUpdater: StoreRequestStateUpdater): Observable<Token> {
    const request = LOGIN_CONFIG.request.adminLogin;
    requestStateUpdater(request.name, {inProgress: true});
    return this.apiService.post<Token>(request.path, credential)
      .pipe(
        tap( token => {
          requestStateUpdater(request.name, {inProgress: false, success: true});
          return token;
        }),
        catchError( (error: HttpErrorResponse) => {
          requestStateUpdater(request.name, {inProgress: false, error: true});
          return throwError(error);
        })
      );
  }
  createAdminPassword(sixDigitNumber: string, requestStateUpdater: StoreRequestStateUpdater): Observable<Credential> {
    const request = LOGIN_CONFIG.request.createAdminAccount;
    requestStateUpdater(request.name, {inProgress: true});
    return this.apiService.post<Credential>(request.path, {numberString: sixDigitNumber})
      .pipe(
        map(credential => {
          requestStateUpdater(request.name, {inProgress: false, success: true});
          return credential;
        }),
        catchError( (error: HttpErrorResponse) => {
          requestStateUpdater(request.name, {inProgress: false, error: true});
          return throwError(error);
        })
      );
  }
}
