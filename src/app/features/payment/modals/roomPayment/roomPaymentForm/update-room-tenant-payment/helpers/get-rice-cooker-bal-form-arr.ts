import { FormArray, FormGroup } from '@angular/forms';

export function getRiceCookerBalFormArr(form: FormGroup): FormArray {
    return form.get('riceCookerBillBalance') as FormArray;
}
