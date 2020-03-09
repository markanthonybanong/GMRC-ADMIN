import { FormGroup } from '@angular/forms';
import { getRentBalFormArr } from './get-rent-bal-form-arr';

export function removeRentBalanceFormGroup(form: FormGroup): void {
    getRentBalFormArr(form).removeAt(0);
}
