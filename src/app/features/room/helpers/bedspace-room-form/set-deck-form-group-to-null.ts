import { FormGroup } from '@angular/forms';

export function setDeckFormGroupToNull(deck: FormGroup): void {
  deck.get('tenant').setValue(null);
  deck.get('dueRentDate').setValue(null);
  deck.get('riceCookerBill').setValue(null);
  deck.get('monthlyRent').setValue(null);
  deck.get('tenantObjectId').setValue(null);
  deck.get('fromServer').setValue(false);
}
