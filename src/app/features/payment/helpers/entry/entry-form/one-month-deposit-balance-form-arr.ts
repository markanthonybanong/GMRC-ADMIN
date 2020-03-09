import { FormGroup, FormArray } from '@angular/forms';

export function oneMonthDepositBalanceFormArr(entryForm: FormGroup): FormArray {
    return entryForm.get('oneMonthDepositBalance') as FormArray;
}
