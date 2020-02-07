import { ApiService } from '@gmrc-admin/shared/services';
import { PageData, StoreRequestStateUpdater } from '@gmrc-admin/shared/types';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { INQUIRY_CONFIG } from '../../../inquiry.config';
import { Inquiry } from '../../../types/inquiry/inquiry';
@Injectable()
export class InquiryEndpoint {
  constructor(private apiService: ApiService ) {}
  inquiries(pageRequest: any, requestStateUpdater: StoreRequestStateUpdater): Observable<PageData<Inquiry>> {
    const request = INQUIRY_CONFIG.request.inquiries;
    requestStateUpdater(request.name, {inProgress: true});
    return this.apiService.post<PageData<Inquiry>>(request.path, pageRequest)
      .pipe(
        tap(
          (pageData) => {
            requestStateUpdater(request.name, {inProgress: false, success: true});
            return pageData;
          },
          (error: HttpErrorResponse) => {
            requestStateUpdater(request.name, {inProgress: false, error: true});
            return throwError(error);
          }
        )
      );
  }
  delete(objectId: string, requestStateUpdater): Observable<Inquiry> {
    const request = INQUIRY_CONFIG.request.delete;
    requestStateUpdater(request.name, {inProgress: true});
    return this.apiService.delete<Inquiry>(`${request.path}${objectId}`)
      .pipe(
        tap(
          (pageData) => {
            requestStateUpdater(request.name, {inProgress: false, success: true});
            return pageData;
          },
          (error: HttpErrorResponse) => {
            requestStateUpdater(request.name, {inProgress: false, error: true});
            return throwError(error);
          }
        )
    );
  }
}
