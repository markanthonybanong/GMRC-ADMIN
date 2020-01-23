import { Injectable } from '@angular/core';
import { enumsToArray } from '../helpers';
import { ApiService } from './api.service';
import { PageData, PageRequest } from '../types';
import { ROOM_CONFIG } from 'src/app/features/room/room.config';
import { tap, switchMap, retry } from 'rxjs/operators';
import { DataStoreService } from './data-store.service';
import { Room } from 'src/app/features/room/types/room/room';
import { RoomStatus, AirconStatus, RoomType } from 'src/app/features/room/room.enums';

@Injectable({
  providedIn: 'root'
})
export class DataRoomService {
 public roomTypes: Array<string> = enumsToArray(RoomType);
 public roomStatuses: Array<string> = enumsToArray(RoomStatus);
 public airconStatuses: Array<string> = enumsToArray(AirconStatus);
 public roomNumbers: Array<number> = [];
 public floorNumbers: Array<number> = [];
 public addedTenantsObjectIds: Array<string> = [];
 constructor(private apiService: ApiService, private dataStoreService: DataStoreService) {}
 init(): void {
   this.initReloadRoom$();
   this.reloadRoom();
 }
 public reloadRoom(): void {
  this.dataStoreService.reloadTable$.next();
 }
 private initReloadRoom$(): void {

   const pageRequest: PageRequest = {
     page: null,
     limit: null,
     filters: {
       type: ROOM_CONFIG.filters.types.ALLROOMS,
     }
   };

   this.dataStoreService.reloadTable$
    .pipe(
      switchMap(() => {
        return this.apiService.post<PageData<Room>>(ROOM_CONFIG.request.rooms.path, pageRequest);
      }),
      tap((pageData) => {
        console.log('page data', pageData);

        this.setRoomNumbers(pageData.data);
        this.setFloorNumbers(pageData.data);
        this.setAddedTenantsObjectIds(pageData.data);
      }),
      retry(1),
    ).subscribe();
 }
 private setRoomNumbers(rooms: Array<Room>): void {
    rooms.forEach(room => {
      this.roomNumbers.push(room.number);
    });
 }
 private setFloorNumbers(rooms: Array<Room>): void {
   rooms.forEach(room => {
    if ( !this.floorNumbers.includes(room.floor)) {
      this.floorNumbers.push(room.floor);
    }
   });

 }
 private setAddedTenantsObjectIds(rooms: Array<Room>): void {
  console.log('passed room ', rooms);

  const objectIds: Array<string> = [];
  rooms.forEach(room => {
    if (room.type === RoomType.TRANSIENT || room.type === RoomType.PRIVATE) {
      room.roomProperties[0].tenants.forEach(tenant => objectIds.push(tenant._id));
    }
  });
  this.addedTenantsObjectIds = objectIds;
  console.log('value  set', this.addedTenantsObjectIds);
 }

}
