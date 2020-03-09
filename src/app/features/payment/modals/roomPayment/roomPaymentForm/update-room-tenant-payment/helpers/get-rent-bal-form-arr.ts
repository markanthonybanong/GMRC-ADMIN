import { FormGroup, FormArray } from '@angular/forms';

export function getRentBalFormArr(form:FormGroup): FormArray {
    return form.get('rentBalance') as FormArray;
}
