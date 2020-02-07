import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DataRoomService } from '@gmrc-admin/shared/services';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { RoomType } from '../../../room.enums';
import { getRoomNumbers, getFloorNumbers } from '@gmrc-admin/shared/helpers';

@Component({
  selector: 'app-search-bedspace-room',
  templateUrl: './search-bedspace-room.component.html',
  styleUrls: ['./search-bedspace-room.component.scss']
})
export class SearchBedspaceRoomComponent implements OnInit, OnDestroy {
  public form = this.formBuilder.group({
    number: null,
    floor: null,
    deckStatus: null,
    awayDeckStatus: null,
    aircon: null,
  });
  public roomNumbers: Array<number>;
  public floorNumbers: Array<number>;
  private destroy$: Subject<boolean> = new Subject<boolean>();
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
