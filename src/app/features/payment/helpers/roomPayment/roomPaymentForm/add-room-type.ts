import { FormGroup } from '@angular/forms';
import { RoomType } from 'src/app/features/room/room.enums';

export function addRoomTypeToForm(form: FormGroup, roomType: string): void {
    if (roomType === RoomType.BEDSPACE) {
        form.get('roomType').setValue(RoomType.BEDSPACE);
      } else if (roomType === RoomType.PRIVATE) {
        form.get('roomType').setValue(RoomType.PRIVATE);
      } else if (roomType === RoomType.SEMIPRIVATE) {
        form.get('roomType').setValue(RoomType.SEMIPRIVATE);
      } else if (roomType === RoomType.TRANSIENT) {
        form.get('roomType').setValue(RoomType.TRANSIENT);
      }
}
