import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Credential } from '../types/credential';
import { StoreRequestStateUpdater } from '@gmrc-admin/shared/types';
import { LOGIN_CONFIG } from '../login.configs';
import { Token } from '../types/token';
import { Api, LocalStorage } from '@gmrc-admin/core';
import {map, catchError} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class LoginEndPoint {
  constructor(private apiService: Api, private localStorageService: LocalStorage) {}
  login(credential: Credential, requestStateUpdater: StoreRequestStateUpdater): Observable<Token> {
    const request = LOGIN_CONFIG.request.login;
    requestStateUpdater(request.name, {inProgress: true});
    return this.apiService.post<Token>(LOGIN_CONFIG.request.login.path, credential)
      .pipe(
        map(response => {
          requestStateUpdater(request.name, {inProgress: true});
          this.localStorageService.setItem('token', response.token);
          this.localStorageService.setItem('tokenExp', response.tokenExp);
          this.apiService.initHttpOptionsHeader();
          return response;
        }),
        catchError( (error: HttpErrorResponse) => {
          requestStateUpdater(request.name, {inProgress: true, error: true});
          return throwError(error);
        })
      );
  }
}
