import { Injectable } from '@angular/core';
import { ApiService } from '@gmrc-admin/shared/services';
import { PageRequest, StoreRequestStateUpdater, PageData } from '@gmrc-admin/shared/types';
import { Observable, throwError } from 'rxjs';
import { UnsettleBillPayment } from '../../../types/unsettleBillPayment/unsettle-bill-payment';
import { PAYMENT_CONFIG } from '../../../payment.config';
import { tap } from 'rxjs/internal/operators/tap';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UnsettleBillFormEndpoint {
    constructor(private apiService: ApiService) {}
    getUnsettleBills(pageRequest: PageRequest, requestStateUpdater: StoreRequestStateUpdater): Observable<PageData<UnsettleBillPayment>> {
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
    addUnsettleBill(unsettleBillPayment: UnsettleBillPayment, requestStateUpdater): Observable<UnsettleBillPayment> {
      const request = PAYMENT_CONFIG.request.addUpdateUnsettleBill;;
      requestStateUpdater(request.name, {inProgress: true});
      return this.apiService.post<UnsettleBillPayment>(request.path, unsettleBillPayment)
        .pipe(
          tap(
            (createdUnsettleBill) => {
              requestStateUpdater(request.name, {inProgress: false, success: true});
              return createdUnsettleBill;
            },
            (error: HttpErrorResponse) => {
              requestStateUpdater(request.name, {inProgress: false, error: true});
              return throwError(error);
            }
          )
        );
    }
    updateUnsettleBill(unsettleBillPayment: UnsettleBillPayment, requestStateUpdater): Observable<UnsettleBillPayment> {
      const request = PAYMENT_CONFIG.request.addUpdateUnsettleBill;
      requestStateUpdater(request.name, {inProgress: true});
      return this.apiService.put<UnsettleBillPayment>(request.path, unsettleBillPayment)
        .pipe(
          tap(
            (updatedEntry) => {
              requestStateUpdater(request.name, {inProgress: false, success: true});
              return updatedEntry;
            },
            (error: HttpErrorResponse) => {
              requestStateUpdater(request.name, {inProgress: false, error: true});
              return throwError(error);
            }
          )
        );
    }
    removeTenantInUnsettleBill(tenant: object, requestStateUpdater): Observable<UnsettleBillPayment> {
        const request = PAYMENT_CONFIG.request.deleteTenantInUnsettleBill;
        requestStateUpdater(request.name, {inProgress: true});
        return this.apiService.put<UnsettleBillPayment>(request.path, tenant)
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
