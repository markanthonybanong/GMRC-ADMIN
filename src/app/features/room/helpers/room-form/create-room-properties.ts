import { Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RoomStatus } from '../../room.enums';

export function createRoomProperties(): FormGroup {
  return new FormBuilder().group({
    status: [RoomStatus.VACANT, Validators.required],
    dueRentDate: null,
    monthlyRent: null,
    });
}
