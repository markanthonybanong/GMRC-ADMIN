import { FormGroup, FormArray } from '@angular/forms';

export function getBedInfos(form: FormGroup): FormArray {
  return form.get('bedInfos') as FormArray;
}
