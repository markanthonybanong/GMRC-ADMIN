import { FormGroup, FormArray } from '@angular/forms';

export function getTenantsFormArr(unsettleBillForm: FormGroup): FormArray {
    return unsettleBillForm.get('tenants') as FormArray;
}
