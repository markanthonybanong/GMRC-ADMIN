import { FormGroup, FormArray } from '@angular/forms';

export function getRoomProperties(form: FormGroup): FormArray {
  return form.get('roomProperties') as FormArray;
}
