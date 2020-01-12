import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { ApiService } from './api.service';
import { Token } from '@gmrc-admin/shared/types';
import { tap  } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private localStorageService: LocalStorageService,
    private apiService: ApiService,
    private router: Router
  ) { }

  get isTokenExpired(): boolean {
    return new JwtHelperService().isTokenExpired(this.localStorageService.getItem('token'));
  }
  onLogOut(): void {
    this.localStorageService.clear();
    this.router.navigate(['/login']);
  }
  onLogin(path: string, credential: object): Observable<Token> {
    return this.apiService.post<Token>(path, credential)
      .pipe(
        tap( (response) => {
          this.setSession(response);
        })
      );
  }
  private setSession(response: Token): void {
    this.localStorageService.setItem('token', response.token);
    this.apiService.initHttpOptionsHeader();
  }
}
