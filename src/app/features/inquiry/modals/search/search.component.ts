import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataRoomService } from '@gmrc-admin/shared/services';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { getRoomNumbers } from '@gmrc-admin/shared/helpers';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  form = this.formBuilder.group({
    roomType: null,
    roomNumber: null,
    willOccupyIn: null,
  });
  public roomNumbers: Array<number>;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dataRoomService: DataRoomService
  ) { }

  ngOnInit() {
    this.setRoomNumbers();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  private setRoomNumbers(): void {
    this.dataRoomService.getAllRooms
      .pipe(
        tap((pageData) => this.roomNumbers = getRoomNumbers(pageData.data)),
        takeUntil(this.destroy$)
      ).subscribe();
  }
}
