import { Injectable } from '@angular/core';
import { ApiService } from '@gmrc-admin/shared/services';
import { StoreRequestStateUpdater, PageData } from '@gmrc-admin/shared/types';
import { PenaltyPayment } from '../../../types/penaltyPayment/penaltyPayment';
import { Observable, throwError } from 'rxjs';
import { PAYMENT_CONFIG } from '../../../payment.config';
import { EntryPayment } from '../../../types/entryPayment/entryPayment';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class PenaltyEndpoint {
    constructor( private apiService: ApiService) {}
    getPenalties(pageRequest: any, requestStateUpdater: StoreRequestStateUpdater): Observable<PageData<PenaltyPayment>> {
        const request = PAYMENT_CONFIG.request.penaltyPayments;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.post<PageData<PenaltyPayment>>(request.path, pageRequest)
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
    deletePenalty(objectId: string, requestStateUpdater): Observable<PenaltyPayment> {
      const request = PAYMENT_CONFIG.request.deletePenalty;
      requestStateUpdater(request.name, {inProgress: true});
      return this.apiService.delete<PenaltyPayment>(`${request.path}${objectId}`)
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
