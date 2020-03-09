import { Injectable } from '@angular/core';
import { ApiService } from '@gmrc-admin/shared/services';
import { PAYMENT_CONFIG } from '../../../payment.config';
import { StoreRequestStateUpdater, PageData } from '@gmrc-admin/shared/types';
import { Observable, throwError } from 'rxjs';
import { RoomPayment } from '../../../types/roomPayment/room-payment';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RoomEndpoint {
    constructor(private apiService: ApiService ) {}
    getRoomPayments(pageRequest: any, requestStateUpdater: StoreRequestStateUpdater): Observable<PageData<RoomPayment>> {
      const request = PAYMENT_CONFIG.request.roomPayments;
      requestStateUpdater(request.name, {inProgress: true});
      return this.apiService.post<PageData<RoomPayment>>(request.path, pageRequest)
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
