import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorage } from '../../local-storage/services/local-storage';
import { API_CONFIG } from '../api-config';
import { Observable } from 'rxjs';

export class Api {
  constructor(private http: HttpClient, private localStorageService: LocalStorage) {
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
