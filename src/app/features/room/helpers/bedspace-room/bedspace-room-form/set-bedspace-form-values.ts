import { FormGroup } from '@angular/forms';
import { Room } from '../../../types/room/room';
export function setBedspaceFormValues(form: FormGroup, room: Room): void {
  form.patchValue({
    number: room.number,
    floor: room.floor,
    type: room.type,
    aircon: room.aircon,
    _id: room._id,
  });
}
