import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { PageData, StoreRequestStateUpdater, PageRequest } from '@gmrc-admin/shared/types';
import { Inquiry } from '../../types/inquiry';
import { ApiService } from '@gmrc-admin/core';
import { INQUIRY_CONFIG } from '../../inquiry.config';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class InquiryListEndpoint {
  constructor(private apiService: ApiService) {}
  list(pageRequest: PageRequest, requestStateUpdater: StoreRequestStateUpdater): Observable<PageData<Inquiry>> {
    const request = INQUIRY_CONFIG.request.list;
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
}
