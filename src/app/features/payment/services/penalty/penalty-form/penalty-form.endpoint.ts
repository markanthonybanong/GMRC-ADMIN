import { ApiService } from '@gmrc-admin/shared/services';
import { PageRequest, StoreRequestStateUpdater, PageData } from '@gmrc-admin/shared/types';
import { Observable, throwError } from 'rxjs';
import { PenaltyPayment } from '../../../types/penaltyPayment/penaltyPayment';
import { PAYMENT_CONFIG } from '../../../payment.config';
import { HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
@Injectable()
export class PenaltyFormEndpoint {
    constructor(private apiService: ApiService) {}
    getPenalties(pageRequest: PageRequest, requestStateUpdater: StoreRequestStateUpdater): Observable<PageData<PenaltyPayment>> {
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
    addPenalty(penalty: PenaltyPayment, requestStateUpdater): Observable<PenaltyPayment> {
      const request = PAYMENT_CONFIG.request.addPenalty;
      requestStateUpdater(request.name, {inProgress: true});
      return this.apiService.post<PenaltyPayment>(request.path, penalty)
        .pipe(
          tap(
            (createdPenalty) => {
              requestStateUpdater(request.name, {inProgress: false, success: true});
              return createdPenalty;
            },
            (error: HttpErrorResponse) => {
              requestStateUpdater(request.name, {inProgress: false, error: true});
              return throwError(error);
            }
          )
        );
    }
    updatePenalty(penalty: PenaltyPayment, requestStateUpdater): Observable<PenaltyPayment> {
      const request = PAYMENT_CONFIG.request.updatePenalty;
      requestStateUpdater(request.name, {inProgress: true});
      return this.apiService.put<PenaltyPayment>(request.path, penalty)
        .pipe(
          tap(
            (updatedPenalty) => {
              requestStateUpdater(request.name, {inProgress: false, success: true});
              return updatedPenalty;
            },
            (error: HttpErrorResponse) => {
              requestStateUpdater(request.name, {inProgress: false, error: true});
              return throwError(error);
            }
          )
        );
    }
}
