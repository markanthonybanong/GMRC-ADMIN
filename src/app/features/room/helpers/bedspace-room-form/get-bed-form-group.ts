import { FormGroup, FormArray } from '@angular/forms';
import { getBedsFormArray } from './get-beds-form-array';

export function getBedFormGroup(bedForm: FormGroup, bedIndex: number): FormGroup {
  return getBedsFormArray(bedForm).at(bedIndex) as FormGroup;
}
