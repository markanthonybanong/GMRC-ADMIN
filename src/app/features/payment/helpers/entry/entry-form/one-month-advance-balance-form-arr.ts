import { FormGroup, FormArray } from '@angular/forms';

export function oneMonthAdvanceBalanceFormArr(entryForm: FormGroup): FormArray {
    return entryForm.get('oneMonthAdvanceBalance') as FormArray;
}
