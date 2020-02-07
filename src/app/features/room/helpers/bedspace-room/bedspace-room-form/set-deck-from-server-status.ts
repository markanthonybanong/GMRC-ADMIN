
import { FormGroup, FormArray } from '@angular/forms';
import { BedspaceTenantType } from '../../../room.enums';
export function setDeckFromServerStatus(deck: FormGroup, tenantType: string): void {
  if (tenantType === BedspaceTenantType.DECK) {
    deck.get('fromServer').patchValue(false);
  } else {
    const awayFormArray = deck.get('away') as FormArray;
    const awayFormGroup = awayFormArray.at(0) as FormGroup;
    awayFormGroup.get('fromServer').patchValue(false);
  }
}
