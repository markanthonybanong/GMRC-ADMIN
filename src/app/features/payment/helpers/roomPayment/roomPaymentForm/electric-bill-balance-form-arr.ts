import { FormGroup, FormArray } from '@angular/forms';

export function electricBillBalanceFormArr(roomPaymentForm: FormGroup): FormArray {
    return roomPaymentForm.get('electricBillBalance') as FormArray;
}
