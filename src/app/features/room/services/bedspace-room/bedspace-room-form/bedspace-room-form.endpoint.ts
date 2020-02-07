import { Injectable } from '@angular/core';
import { ROOM_CONFIG } from '../../../room.config';
import { ApiService } from '@gmrc-admin/shared/services';
import { PageRequest, StoreRequestStateUpdater, PageData } from '@gmrc-admin/shared/types';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Room } from '../../../types/room/room';
import { Bedspace } from '../../../types/room/bedspace';
import { Tenant } from 'src/app/features/tenant/types/tenant/tenant';

@Injectable()
export class BedspaceRoomFormEndpoint {
  constructor(private apiService: ApiService) {}
  getRoom(pageRequest: PageRequest, requestStateUpdater: StoreRequestStateUpdater): Observable<PageData<Room>> {
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
  addBed(body: object, requestStateUpdater): Observable<Bedspace> {
    const request = ROOM_CONFIG.request.submit.addBed;
    requestStateUpdater(request.name, {inProgress: true});
    return this.apiService.post<Bedspace>(request.path, body)
    .pipe(
      tap(
        (createdBed) => {
          requestStateUpdater(request.name, {inProgress: false, success: true});
          return createdBed;
        },
        (error: HttpErrorResponse) => {
          requestStateUpdater(request.name, {inProgress: false, error: true});
          return throwError(error);
        }
      )
    );
  }
  updateBed(body: object, requestStateUpdater): Observable<Bedspace> {
    const request = ROOM_CONFIG.request.submit.updateBed;
    requestStateUpdater(request.name, {inProgress: true});
    return this.apiService.put<Bedspace>(request.path, body)
    .pipe(
      tap(
        (createdBed) => {
          requestStateUpdater(request.name, {inProgress: false, success: true});
          return createdBed;
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
