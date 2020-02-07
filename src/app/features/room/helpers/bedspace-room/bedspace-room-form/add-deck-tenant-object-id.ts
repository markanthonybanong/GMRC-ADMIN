import { FormGroup } from '@angular/forms';
import { getDeckFormGroup } from './get-deck-form-group';

export function addDeckTenantObjectId(bedForm: FormGroup, bedIndex: number, deckIndex: number, tenantObjectId: string): void {
  getDeckFormGroup(bedForm, bedIndex, deckIndex).get('tenantObjectId').setValue(tenantObjectId);
}
