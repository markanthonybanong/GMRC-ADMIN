import { FormGroup, FormArray } from '@angular/forms';

export function getBedsFormArray(bedForm: FormGroup): FormArray {
  return bedForm.get('beds') as FormArray;
}
