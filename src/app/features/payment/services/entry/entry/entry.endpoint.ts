import { Injectable } from '@angular/core';
import { PAYMENT_CONFIG } from '../../../payment.config';
import { ApiService } from '@gmrc-admin/shared/services';
import { StoreRequestStateUpdater, PageData } from '@gmrc-admin/shared/types';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { EntryPayment } from '../../../types/entryPayment/entryPayment';

@Injectable()
export class EntryEndpoint {
    constructor( private apiService: ApiService) {}
    getEntries(pageRequest: any, requestStateUpdater: StoreRequestStateUpdater): Observable<PageData<EntryPayment>> {
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
}
