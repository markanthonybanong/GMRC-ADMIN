import { Injectable } from '@angular/core';
import { ApiService } from '@gmrc-admin/shared/services';
import { StoreRequestStateUpdater, PageData } from '@gmrc-admin/shared/types';
import { Observable, throwError, pipe } from 'rxjs';
import { PAYMENT_CONFIG } from '../../../payment.config';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { UnsettleBillPayment } from '../../../types/unsettleBillPayment/unsettle-bill-payment';

@Injectable()
export class UnsettleBillEndpoint {
    constructor( private apiService: ApiService) {}
    getUnsettleBills(pageRequest: any, requestStateUpdater: StoreRequestStateUpdater): Observable<PageData<UnsettleBillPayment>> {
        const request = PAYMENT_CONFIG.request.unsettleBillPayments;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<PageData<UnsettleBillPayment>>(request.path, pageRequest)
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
    removeUnsettleBill(unsettleBillObjId: string, requestStateUpdater): Observable<UnsettleBillPayment> {
      const request = PAYMENT_CONFIG.request.deleteUnsettleBill;
      requestStateUpdater(request.name, {inProgress: true});
      return this.apiService.delete<UnsettleBillPayment>(`${request.path}${unsettleBillObjId}`)
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
