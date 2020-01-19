import { Injectable, OnInit } from '@angular/core';
import { enumsToArray } from '../helpers';
import { RoomType } from '../enums';
import { ApiService } from './api.service';
import { PageData, PageRequest } from '../types';
import { ROOM_CONFIG } from 'src/app/features/room/room.config';
import { map } from 'rxjs/internal/operators/map';
import { Room } from 'src/app/features/types/room';
import { filter, tap, switchMap, retry } from 'rxjs/operators';
import { DataStoreService } from './data-store.service';

@Injectable({
  providedIn: 'root'
})
export class DataRoomService {
 private pageRequest: PageRequest = {
      page: null,
      limit: null,
      filters: {
        type: ROOM_CONFIG.filters.types.ALLROOMS,
      }
 };
 public roomTypes: Array<string> = enumsToArray(RoomType);
 public roomNumbers: Array<number> = [];
 onInit(): void {
   this.initReloadList$();
   this.reloadList();
 }
 private initReloadList$(): void {
   this.dataStoreService.reloadList$
    .pipe(
      switchMap(() => {
        return this.apiService.post<PageData<Room>>(ROOM_CONFIG.request.list.path, this.pageRequest);
      }),
      tap((pageData) => {
        this.setRoomNumbers(pageData.data);
      }),
      retry(1),
    ).subscribe();
 }
 private reloadList(): void {
   this.dataStoreService.reloadList$.next();
 }
 private setRoomNumbers(rooms: Array<Room>): void {
    rooms.forEach(room => {
      this.roomNumbers.push(room.number);
    });
 }

 constructor(private apiService: ApiService, private dataStoreService: DataStoreService) {}
}
