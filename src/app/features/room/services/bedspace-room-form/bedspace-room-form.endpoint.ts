import { Injectable } from '@angular/core';
import { ROOM_CONFIG } from '../../room.config';
import { ApiService } from '@gmrc-admin/shared/services';
import { PageRequest, StoreRequestStateUpdater, PageData } from '@gmrc-admin/shared/types';
import { Observable, throwError } from 'rxjs';
import { Tenant } from 'src/app/features/tenant/types/tenant';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Room } from '../../types/room/room';

@Injectable()
export class BedspaceRoomFormEndpoint {
  constructor(private apiService: ApiService) {}
  getRooms(pageRequest: PageRequest, requestStateUpdater: StoreRequestStateUpdater): Observable<PageData<Room>> {
    const request = ROOM_CONFIG.request.room;
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
  getTenants(pageRequest: PageRequest, requestStateUpdater: StoreRequestStateUpdater): Observable<PageData<Tenant>> {
    const request = ROOM_CONFIG.request.tenantByKeyStroke;
    requestStateUpdater(request.name, {inProgress: true});
    return this.apiService.post<PageData<Tenant>>(request.path, pageRequest)
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
