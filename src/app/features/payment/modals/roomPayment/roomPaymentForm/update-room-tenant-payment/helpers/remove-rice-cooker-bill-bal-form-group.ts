import { FormGroup } from '@angular/forms';
import { getRiceCookerBalFormArr } from './get-rice-cooker-bal-form-arr';

export function removeRiceCookerBillBalFormGroup(form: FormGroup): void {
    getRiceCookerBalFormArr(form).removeAt(0);
}
