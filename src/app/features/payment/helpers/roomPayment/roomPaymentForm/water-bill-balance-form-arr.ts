import { FormArray, FormGroup } from '@angular/forms';

export function waterBillBalanceFormArr(roomPaymentForm: FormGroup): FormArray {
    return roomPaymentForm.get('waterBillBalance') as FormArray;
}
