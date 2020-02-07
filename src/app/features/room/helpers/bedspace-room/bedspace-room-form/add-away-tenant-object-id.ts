import { FormGroup } from '@angular/forms';
import { getAwayFormArray } from './get-away-form-array';

export function addAwayTenantObjectId(bedForm: FormGroup, bedIndex: number, deckIndex: number, tenantObjectId: string): void {
  const awayFormGroup = getAwayFormArray(bedForm, bedIndex, deckIndex).at(0) as FormGroup;
  awayFormGroup.get('tenantObjectId').patchValue(tenantObjectId);
}
