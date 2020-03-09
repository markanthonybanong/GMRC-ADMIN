import { FormGroup } from '@angular/forms';
import { getRiceCookerBalFormArr } from './get-rice-cooker-bal-form-arr';
import { createBalFormGroup } from './create-bal-form-group';

export function addRiceCookerBillBalFormGroup(form: FormGroup): void {
    getRiceCookerBalFormArr(form).push(createBalFormGroup());
}
