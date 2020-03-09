import { FormGroup, FormArray } from '@angular/forms';

export function getPaymentBalanceFormArr(penaltyForm: FormGroup): FormArray {
    return penaltyForm.get('paymentBalance') as FormArray;
}
