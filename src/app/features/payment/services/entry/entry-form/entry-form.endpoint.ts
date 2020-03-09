import { Injectable } from '@angular/core';
import { PageRequest, StoreRequestStateUpdater, PageData } from '@gmrc-admin/shared/types';
 import { Observable, throwError } from 'rxjs';
import { PAYMENT_CONFIG } from '../../../payment.config';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '@gmrc-admin/shared/services';
import { EntryPayment } from '../../../types/entryPayment/entryPayment';

@Injectable() 
export class EntryFormEndpoint {
    constructor(private apiService: ApiService) {}
    getEntries(pageRequest: PageRequest, requestStateUpdater: StoreRequestStateUpdater): Observable<PageData<EntryPayment>> {
      const request = PAYMENT_CONFIG.request.entryPayments;
      requestStateUpdater(request.name, {inProgress: true});
      return this.apiService.post<PageData<EntryPayment>>(request.path, pageRequest)
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
    addEntry(entryPayment: EntryPayment, requestStateUpdater): Observable<EntryPayment> {
      const request = PAYMENT_CONFIG.request.addEntry;
      requestStateUpdater(request.name, {inProgress: true});
      return this.apiService.post<EntryPayment>(request.path, entryPayment)
        .pipe(
          tap(
            (createdEntry) => {
              requestStateUpdater(request.name, {inProgress: false, success: true});
              return createdEntry;
            },
            (error: HttpErrorResponse) => {
              requestStateUpdater(request.name, {inProgress: false, error: true});
              return throwError(error);
            }
          )
        );
    }
    updateEntry(entry: EntryPayment, requestStateUpdater): Observable<EntryPayment> {
      const request = PAYMENT_CONFIG.request.updateEntry;
      requestStateUpdater(request.name, {inProgress: true});
      return this.apiService.put<EntryPayment>(`${request.path}${entry._id}`, entry)
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
}
