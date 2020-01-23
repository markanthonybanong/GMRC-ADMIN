import { Room } from '../../types/room/room';
import { Observable, throwError } from 'rxjs';
import { ROOM_CONFIG } from '../../room.config';
import { Injectable } from '@angular/core';
import { ApiService } from '@gmrc-admin/shared/services';
import { tap } from 'rxjs/internal/operators/tap';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class RoomFormEndpoint {
  constructor(private apiService: ApiService) {}
  add(room: Room, requestStateUpdater): Observable<Room> {
    const request = ROOM_CONFIG.request.submit.addRoom;
    requestStateUpdater(request.name, {inProgress: true});
    return this.apiService.post<Room>(request.path, room)
      .pipe(
        tap(
          (createdRoom) => {
            requestStateUpdater(request.name, {inProgress: false, success: true});
            return createdRoom;
          },
          (error: HttpErrorResponse) => {
            requestStateUpdater(request.name, {inProgress: false, error: true});
            return throwError(error);
          }
        )
      );
  }
}
