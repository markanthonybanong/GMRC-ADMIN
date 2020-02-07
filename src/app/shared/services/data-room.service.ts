import { Injectable } from '@angular/core';
import { enumsToArray, getRoomNumbers, getFloorNumbers } from '@gmrc-admin/shared/helpers';
import { ApiService } from './api.service';
import { PageData, PageRequest } from '@gmrc-admin/shared/types';
import { ROOM_CONFIG } from 'src/app/features/room/room.config';
import { DataStoreService } from './data-store.service';
import { Room } from 'src/app/features/room/types/room/room';
import { RoomStatus, AirconStatus, RoomType, DeckStatus } from 'src/app/features/room/room.enums';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataRoomService {
 private pagRequest: PageRequest = {
   page: 1,
   limit: 200,
   filters: {
    type: ROOM_CONFIG.filter.type.ALLROOMS
   }
 };
 public roomNumbers: Array<number>;
 public floorNumbers: Array<number>;
 constructor(
   private apiService: ApiService,
   private dataStoreService: DataStoreService,
   ) {
   this.setRooms();
 }
 get tranSientPrivateDisplayedColumns(): Array<string> {
  return [
    'roomNumber',
    'floorNumber',
    'roomType',
    'aircon',
    'roomStatus',
    'dueRentDate',
    'tenant',
    'actions'
  ];
 }
 get bedspaceDisplayedColumns(): Array<string> {
  return [
    'roomNumber',
    'floorNumber',
    'aircon',
    'bed',
    'actions',
  ];
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
 get awayDeckStatuses(): Array<string> {
  return this.deckStatus.filter( e => e !== DeckStatus.AWAY);
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
 // call this method, to fetch latest data
 public setRooms(): void {
  this.getAllRooms
    .pipe(
      tap((pageData) => {
        this.roomNumbers = getRoomNumbers(pageData.data);
        this.floorNumbers = getFloorNumbers(pageData.data);
      }),
    ).subscribe();
 }
}
