import { Injectable } from '@angular/core';
import { PageRequest, StoreRequestStateUpdater, PageData } from '@gmrc-admin/shared/types';
import { Observable, throwError } from 'rxjs';
import { Room } from '../../types/room/room';
import { ROOM_CONFIG } from '../../room.config';
import { ApiService } from '@gmrc-admin/shared/services';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Tenant } from 'src/app/features/tenant/types/tenant';
import { TenantData } from '../../types/transient-private-room-tenant-form/tenant-data';

@Injectable()
export class TransientPrivateRoomFormEndpoint {
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
  addTenant(data: TenantData, requestStateUpdater: StoreRequestStateUpdater): Observable<Room> {
    const request = ROOM_CONFIG.request.submit.addTenantInTransientPrivateRoom;
    requestStateUpdater(request.name, {inProgress: true});


    return this.apiService.post<Room>(request.path, data)
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
  removeTenant(data: TenantData, requestStateUpdater: StoreRequestStateUpdater): Observable<Room> {
    const request = ROOM_CONFIG.request.removeTenantInTransientPrivateRoom;
    requestStateUpdater(request.name, {inProgress: true});
    return this.apiService.put<Room>(request.path, data)
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
  updateRoom(room: Room, requestStateUpdater: StoreRequestStateUpdater): Observable<Room> {
    const request = ROOM_CONFIG.request.submit.updateRoom;
    requestStateUpdater(request.name, {inProgress: true});
    return this.apiService.put<Room>(request.path, room)
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
