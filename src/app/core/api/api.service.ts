import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    this.initHttpOptionsHeader();
   }
  initHttpOptionsHeader(): void {
    const token = this.localStorageService.getItem('token');
    API_CONFIG.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }
  post<T>(path, body): Observable<T> {
    return this.http.post<T>(`${API_CONFIG.apiUrl}${path}`, body, API_CONFIG.httpOptions);
  }
  put<T>(path, body): Observable<T> {
    return this.http.put<T>(`${API_CONFIG.apiUrl}${path}`, body, API_CONFIG.httpOptions);
  }
  get<T>(path): Observable<T> {
    return this.http.get<T>(`${API_CONFIG.apiUrl}${path}`, API_CONFIG.httpOptions);
  }
  delete<T>(path): Observable<T> {
    return this.http.delete<T>(`${API_CONFIG.apiUrl}${path}`, API_CONFIG.httpOptions);
  }
}
