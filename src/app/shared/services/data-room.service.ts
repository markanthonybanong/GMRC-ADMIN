import { Injectable, OnInit } from '@angular/core';
import { enumsToArray } from '../helpers';
import { ApiService } from './api.service';
import { PageData, PageRequest } from '../types';
import { ROOM_CONFIG } from 'src/app/features/room/room.config';
import { DataStoreService } from './data-store.service';
import { Room } from 'src/app/features/room/types/room/room';
import { RoomStatus, AirconStatus, RoomType } from 'src/app/features/room/room.enums';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataRoomService{
 private rooms$: Subject<PageData<Room>> = new BehaviorSubject<PageData<Room>>({data: null, pageCount: null, totalCount: null});
 private pagRequest: PageRequest = {
   page: 1,
   limit: 200,
   filters: {
    type: ROOM_CONFIG.filters.types.ALLROOMS
   }
 };
 constructor(private apiService: ApiService, private dataStoreService: DataStoreService) {
   this.getRooms();
 }
 get rooms(): Observable<PageData<Room>> {
  return this.rooms$.asObservable();
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
 public getRooms(): void {
   this.apiService.post<PageData<Room>>(ROOM_CONFIG.request.rooms.path, this.pagRequest)
    .subscribe((pageData) => {
      this.rooms$.next(pageData);
    });
 }

}
