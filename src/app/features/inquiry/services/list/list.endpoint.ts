import { ApiService } from '@gmrc-admin/shared/services';
import { INQUIRY_CONFIG } from '../../inquiry.config';
import { PageData, StoreRequestStateUpdater } from '@gmrc-admin/shared/types';
import { Inquiry } from '../../types/inquiry';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { PageRequest } from '@gmrc-admin/shared/helpers';
@Injectable()
export class ListEndpoint {
  constructor(private apiService: ApiService ) {}
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
