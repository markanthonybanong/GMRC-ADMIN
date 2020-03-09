import { FormGroup, FormArray } from '@angular/forms';

export function partialPaymentFormArr(entryForm: FormGroup): FormArray {
    return entryForm.get('partialPayments') as FormArray;
}
