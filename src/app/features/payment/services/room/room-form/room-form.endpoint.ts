import { Injectable } from '@angular/core';
import { ApiService } from '@gmrc-admin/shared/services';
import { PageRequest, StoreRequestStateUpdater, PageData } from '@gmrc-admin/shared/types';
import { PAYMENT_CONFIG } from '../../../payment.config';
import { Observable, throwError } from 'rxjs';
import { RoomPayment } from '../../../types/roomPayment/room-payment';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Room } from 'src/app/features/room/types/room/room';
 

@Injectable()
export class RoomFormEndpoint {
    constructor(private apiService: ApiService) {}
    getRoomPayments(pageRequest: PageRequest, requestStateUpdater: StoreRequestStateUpdater): Observable<PageData<RoomPayment>> {
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
    addRoomPayment(roomPayment: RoomPayment, requestStateUpdater): Observable<RoomPayment> {
      const request = PAYMENT_CONFIG.request.addRoomPayment;
      requestStateUpdater(request.name, {inProgress: true});
      return this.apiService.post<RoomPayment>(request.path, roomPayment)
        .pipe(
          tap(
            (createdRoomPayment) => {
              requestStateUpdater(request.name, {inProgress: false, success: true});
              return createdRoomPayment;
            },
            (error: HttpErrorResponse) => {
              requestStateUpdater(request.name, {inProgress: false, error: true});
              return throwError(error);
            }
          )
        );
    }
    updateRoomPayment(roomPayment: RoomPayment, requestStateUpdater): Observable<RoomPayment> {
      const request = PAYMENT_CONFIG.request.updateRoomPayment;
      requestStateUpdater(request.name, {inProgress: true});
      return this.apiService.put<RoomPayment>(`${request.path}${roomPayment._id}`, roomPayment)
        .pipe(
          tap(
            (updatedRoomPayment) => {
              requestStateUpdater(request.name, {inProgress: false, success: true});
              return updatedRoomPayment;
            },
            (error: HttpErrorResponse) => {
              requestStateUpdater(request.name, {inProgress: false, error: true});
              return throwError(error);
            }
          )
        );
    }
    roomByRoomNumber(pageRequest: PageRequest, requestStateUpdater: StoreRequestStateUpdater): Observable<PageData<Room>> {
      const request = PAYMENT_CONFIG.request.room;
      requestStateUpdater(request.name, {inProgress: true});
      return this.apiService.post<PageData<Room>>(request.path, pageRequest)
        .pipe(
          tap(
            (pageData) => {
              requestStateUpdater(request.name, {inProgress: false, success: true});
              return pageData;
            },
            (error: HttpErrorResponse) => {
              requestStateUpdater(request.name, {inProgress: false, success: true});
              return throwError;
            }
          )
        );
    }
}
