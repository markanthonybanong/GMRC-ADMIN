import { Injectable } from '@angular/core';
import { ApiService } from '@gmrc-admin/shared/services';
import { StoreRequestStateUpdater, PageData, PageRequest } from '@gmrc-admin/shared/types';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { INQUIRY_CONFIG } from '../../../inquiry.config';
import { Inquiry } from '../../../types/inquiry/inquiry';

@Injectable()
export class InquiryFormEndpoint {
  constructor(private apiService: ApiService) {}
  getInquiry(pageRequest: PageRequest, requestStateUpdater: StoreRequestStateUpdater): Observable<PageData<Inquiry>> {
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
  addInquiry(inquiry: Inquiry, requestStateUpdater): Observable<Inquiry> {
    const request = INQUIRY_CONFIG.request.submit;
    requestStateUpdater(request.name, {inProgress: true});
    return this.apiService.post<Inquiry>(request.path, inquiry)
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
  updateInquiry(inquiry: Inquiry, requestStateUpdater): Observable<Inquiry> {
    const request = INQUIRY_CONFIG.request.submit;
    requestStateUpdater(request.name, {inProgress: true});
    return this.apiService.put<Inquiry>(`${request.path}${inquiry._id}`, inquiry)
      .pipe(
        tap(
          (updatedInquiry) => {
            requestStateUpdater(request.name, {inProgress: false, success: true});
            return updatedInquiry;
          },
          (error: HttpErrorResponse) => {
            requestStateUpdater(request.name, {inProgress: false, error: true});
            return throwError(error);
          }
        )
      );
  }
}
