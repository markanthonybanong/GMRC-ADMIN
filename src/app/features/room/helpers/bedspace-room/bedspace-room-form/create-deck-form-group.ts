import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeckStatus } from '../../../room.enums';

export function createDeckFormGroup(): FormGroup {
  const formBuilder = new FormBuilder();
  return formBuilder.group({
    number: [null, Validators.required],
    status: [DeckStatus.VACANT, Validators.required],
    tenant: null,
    dueRentDate: null,
    riceCookerBill: null,
    monthlyRent: null,
    away: formBuilder.array([]),
    tenantObjectId: null,
    fromServer: false,
  });
}
