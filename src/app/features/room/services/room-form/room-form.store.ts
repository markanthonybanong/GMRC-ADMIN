import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { getRoomProperties } from '../../helpers/room-form/get-room-properties';
import { createRoomProperties } from '../../helpers/room-form/create-room-properties';
import { RoomType, Request } from '@gmrc-admin/shared/enums';
import { Store } from 'rxjs-observable-store';
import { RoomFormStoreState } from './room-form.store.state';
import { Router } from '@angular/router';
import { Room } from '../../types/room';
import { Observable, Subject } from 'rxjs';
import { RoomFormEndpoint } from './room-form.endpoint';
import { tap, takeUntil } from 'rxjs/operators';
import { DataStoreService } from '@gmrc-admin/shared/services';
import { getStoreRequestStateUpdater } from '@gmrc-admin/shared/helpers';
import { MatDialog } from '@angular/material';
import { ActionResponseComponent } from '@gmrc-admin/shared/modals';
import { ROOM_CONFIG } from '../../room.config';

@Injectable()
export class RoomFormStore extends Store<RoomFormStoreState> implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public form = this.formBuilder.group({
    number: [null, Validators.required],
    floor: null,
    type: [null, Validators.required],
    aircon: null,
    roomProperties: this.formBuilder.array([]),
    _id: ['']
  });
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private endpoint: RoomFormEndpoint,
    private dataStoreService: DataStoreService,
    private dialog: MatDialog,
    ) {
    super(new RoomFormStoreState());
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  init(): void {
    this.dataStoreService.storeRequestStateUpdater = getStoreRequestStateUpdater(this);
  }
  onRoomTypeChange(roomType: string): void {
    if (roomType !== RoomType.BEDSPACE && getRoomProperties(this.form).length === 0) {
      getRoomProperties(this.form).push(createRoomProperties());
    } else if (roomType === RoomType.BEDSPACE && getRoomProperties(this.form).length) {
      getRoomProperties(this.form).removeAt(0);
    }
  }
  onBack(): void {
    this.router.navigate(['room/private-transient']);
  }
  onSubmit(inputRoom: Room): void {
    this.endpoint.add(inputRoom, this.dataStoreService.storeRequestStateUpdater)
      .pipe(
        tap(
          (room) => {
            this.dialog.open(
              ActionResponseComponent, {
                data: {
                  title: ROOM_CONFIG.actions.add,
                  content: `Added room number ${room.number}`,
                }
              }
            );
            this.router.navigate(['room/private-transient']);
          },
          () => {
            this.dialog.open(
              ActionResponseComponent, {
                data: {
                  title: ROOM_CONFIG.actions.add,
                  content: this.dataStoreService.request.Error,
                }
              }
            );
          }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
