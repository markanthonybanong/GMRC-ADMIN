import { FormGroup } from '@angular/forms';
import { getAwayFormArray } from './get-away-form-array';

export function addAwayTenantObjectId(bedForm: FormGroup, bedIndex: number, deckIndex: number, tenantObjectId: string): void {
  getAwayFormArray(bedForm, bedIndex, deckIndex).at(0).get('tenantObjectId').patchValue(tenantObjectId);
}
