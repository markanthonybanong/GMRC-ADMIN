import { Injectable, OnInit } from '@angular/core';
import { enumsToArray } from '../helpers';
import { ApiService } from './api.service';
import { PageData, PageRequest } from '../types';
import { ROOM_CONFIG } from 'src/app/features/room/room.config';
import { DataStoreService } from './data-store.service';
import { Room } from 'src/app/features/room/types/room/room';
import { RoomStatus, AirconStatus, RoomType, DeckStatus } from 'src/app/features/room/room.enums';
import { Subject, Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { error } from 'util';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataRoomService {
 private pagRequest: PageRequest = {
   page: 1,
   limit: 200,
   filters: {
    type: ROOM_CONFIG.filters.types.ALLROOMS
   }
 };
 constructor(private apiService: ApiService, private dataStoreService: DataStoreService) {

 }

 get roomTypes(): Array<string> {
  return enumsToArray(RoomType);
 }
 get roomStatuses(): Array<string> {
  return enumsToArray(RoomStatus);
 }
 get airconStatuses(): Array<string> {
  return enumsToArray(AirconStatus);
 }
 get deckStatus(): Array<string> {
   return enumsToArray(DeckStatus);
 }
 get getAllRooms(): Observable<PageData<Room>> {
  return this.apiService.post<PageData<Room>>(ROOM_CONFIG.request.rooms.path, this.pagRequest)
    .pipe(
      tap(
        (pageData) => {
          return pageData;
        },
        // tslint:disable-next-line: no-shadowed-variable
        (error: HttpErrorResponse) => {
          return throwError(error);
        }
      )
    );
 }

}
