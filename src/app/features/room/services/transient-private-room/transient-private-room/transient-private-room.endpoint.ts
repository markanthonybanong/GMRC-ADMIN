import { Injectable } from '@angular/core';
import { ApiService } from '@gmrc-admin/shared/services';
import { ROOM_CONFIG } from '../../../room.config';
import { StoreRequestStateUpdater, PageData } from '@gmrc-admin/shared/types';
import { Observable, throwError } from 'rxjs';
import { Room } from '../../../types/room/room';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class TransientPrivateRoomEndpoint {
  constructor(private apiService: ApiService ) {}
  rooms(pageRequest: any, requestStateUpdater: StoreRequestStateUpdater): Observable<PageData<Room>> {
    const request = ROOM_CONFIG.request.rooms;
    requestStateUpdater(request.name, {inProgress: true});
    return this.apiService.post<PageData<Room>>(request.path, pageRequest)
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

