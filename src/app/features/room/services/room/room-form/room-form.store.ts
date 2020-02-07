import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { getRoomProperties } from '../../../helpers/room/room-form/get-room-properties';
import { createRoomProperties } from '../../../helpers/room/room-form/create-room-properties';
import { Store } from 'rxjs-observable-store';
import { RoomFormStoreState } from './room-form.store.state';
import { Router } from '@angular/router';
import { Room } from '../../../types/room/room';
import { RoomFormEndpoint } from './room-form.endpoint';
import { tap } from 'rxjs/operators';
import { DataStoreService, ModalService } from '@gmrc-admin/shared/services';
import { getStoreRequestStateUpdater } from '@gmrc-admin/shared/helpers';
import { ROOM_CONFIG } from '../../../room.config';
import { RoomType } from '../../../room.enums';
import {Location} from '@angular/common';

@Injectable()
export class RoomFormStore extends Store<RoomFormStoreState> {

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
    private location: Location,
    private modalService: ModalService,
    ) {
    super(new RoomFormStoreState());
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
            this.modalService.confirmation(ROOM_CONFIG.action.add, `Added room number ${room.number}`)
              .afterClosed().subscribe(() => this.location.back());
          },
          () => {
            this.modalService.error(ROOM_CONFIG.action.add);
          }
        )
      )
      .subscribe();
  }
}
