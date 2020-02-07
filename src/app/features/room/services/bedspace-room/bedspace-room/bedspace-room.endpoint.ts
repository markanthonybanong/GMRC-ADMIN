import { Injectable } from '@angular/core';
import { ApiService } from '@gmrc-admin/shared/services';
import { PageData, StoreRequestStateUpdater, PageRequest } from '@gmrc-admin/shared/types';
import { Room } from '../../../types/room/room';
import { Observable, throwError } from 'rxjs';
import { ROOM_CONFIG } from '../../../room.config';
import { HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable()
export class BedspaceRoomEndpoint {
  constructor(private apiService: ApiService) {}
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
