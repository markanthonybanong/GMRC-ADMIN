import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Room } from '../../types/room';
import { Tenant } from 'src/app/features/tenant/types/tenant';

export function setTransientPrivateFormValues(form: FormGroup, room: Room) {
  if ( room.roomProperties.length) {
    const tenantArr: Array<Tenant> = [];
    const roomProperties = form.get('roomProperties') as FormArray;
    room.roomProperties[0].tenants.forEach((tenant) => tenantArr.push(tenant));
    roomProperties.push(
      new FormBuilder().group({
        status: room.roomProperties[0].status,
        dueRentDate: room.roomProperties[0].dueRentDate,
        monthlyRent: room.roomProperties[0].monthlyRent,
        riceCookerBill: room.roomProperties[0].riceCookerBill,
        tenants: tenantArr,
      })
    );
  }
  form.patchValue({
      number: room.number,
      floor: room.floor,
      type: room.type,
      aircon: room.aircon,
      _id: room._id,
  });
}
