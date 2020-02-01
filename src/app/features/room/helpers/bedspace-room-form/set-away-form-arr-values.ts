import { Away } from '../../types/room/away';
import { FormBuilder, FormArray } from '@angular/forms';

export function setAwayFormArrValues(away: Away): FormArray {
  const formBuilder = new FormBuilder();
  return formBuilder.array([
    formBuilder.group({
      willReturnIn: away.willReturnIn,
      status: away.status,
      inDate: away.inDate,
      inTime: away.inTime,
      outDate: away.outDate,
      outTime: away.outTime,
      dueRentDate: away.dueRentDate,
      rent: away.rent,
      tenant: away.tenant !== null ? `${away.tenant.firstname} ${away.tenant.middlename} ${away.tenant.lastname}` : null,
      tenantObjectId: away.tenant !== null ? away.tenant._id : null,
      fromServer: away.tenant !== null ? true : false,
    }),
  ]);
}
