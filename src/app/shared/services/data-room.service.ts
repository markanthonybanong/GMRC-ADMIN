import { Injectable } from '@angular/core';
import { enumsToArray } from '../helpers';
import { RoomType } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class DataRoomService {
 public roomTypes: Array<string> = enumsToArray(RoomType);
}
