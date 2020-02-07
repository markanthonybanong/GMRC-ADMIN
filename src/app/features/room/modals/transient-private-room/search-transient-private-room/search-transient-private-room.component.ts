import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataRoomService } from '@gmrc-admin/shared/services';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { getRoomNumbers, getFloorNumbers } from '@gmrc-admin/shared/helpers';
import { RoomType } from '../../../room.enums';

@Component({
  selector: 'app-search-transient-private-room',
  templateUrl: './search-transient-private-room.component.html',
  styleUrls: ['./search-transient-private-room.component.scss']
})
export class SearchTransientPrivateRoomComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  roomNumbers: Array<number>;
  floorNumbers: Array<number>;
  roomTypes: Array<string> = [RoomType.PRIVATE, RoomType.TRANSIENT];
  form = this.formBuilder.group({
    number: null,
    floor: null,
    type: null,
    status: null,
    aircon: null,
    dueRentDate: null,
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dataRoomService: DataRoomService
  ) { }

  ngOnInit() {
    this.setRoomAndFloorNumbers();
  }

  ngOnDestroy(): void {
   this.destroy$.next(true);
   this.destroy$.unsubscribe();
  }
  private setRoomAndFloorNumbers(): void {
    this.dataRoomService.getAllRooms
      .pipe(
        tap((pageData) => {
          this.roomNumbers = getRoomNumbers(pageData.data);
          this.floorNumbers = getFloorNumbers(pageData.data);
        }),
        takeUntil(this.destroy$)
      ).subscribe();
  }

}
