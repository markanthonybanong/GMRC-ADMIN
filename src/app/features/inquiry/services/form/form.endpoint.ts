import { Injectable } from '@angular/core';
import { ApiService } from '@gmrc-admin/shared/services';
import { StoreRequestStateUpdater, PageData, PageRequest } from '@gmrc-admin/shared/types';
import { Observable, throwError } from 'rxjs';
import { Inquiry } from '../../types/inquiry';
import { INQUIRY_CONFIG } from '../../inquiry.config';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class FormEndpoint {
  constructor(private apiService: ApiService) {}
  inquiry(pageRequest: PageRequest, requestStateUpdater: StoreRequestStateUpdater): Observable<PageData<Inquiry>> {
    const request = INQUIRY_CONFIG.request.inquiry;
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
  add(inquiry: Inquiry, requestStateUpdater): Observable<Inquiry> {
    const request = INQUIRY_CONFIG.request.submit;
    requestStateUpdater(request.name, {inProgress: true});
    return this.apiService.post<Inquiry>(request.path.add, inquiry)
      .pipe(
        tap(
          (createdInquiry) => {
            requestStateUpdater(request.name, {inProgress: false, success: true});
            return createdInquiry;
          },
          (error: HttpErrorResponse) => {
            requestStateUpdater(request.name, {inProgress: false, error: true});
            return throwError(error);
          }
        )
      );
  }
}
