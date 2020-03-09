import { FormGroup } from '@angular/forms';
import { getRentBalFormArr } from './get-rent-bal-form-arr';
import { createBalFormGroup } from './create-bal-form-group';

export function addRentBalanceFormGroup(form: FormGroup): void {
    getRentBalFormArr(form).push(createBalFormGroup());
}
