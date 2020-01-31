import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeckStatus } from '../../room.enums';

export function createAwayFormGroup(): FormGroup {
  return new FormBuilder().group({
    willReturnIn: [null, Validators.required],
    status: [DeckStatus.VACANT, Validators.required],
    inDate: null,
    inTime: null,
    outDate: null,
    outTime: null,
    dueRentDate: null,
    rent: null,
    tenant: null,
    tenantObjectId: null,
    fromServer: false
  });
}
