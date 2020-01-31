import { FormGroup } from '@angular/forms';
import { getBedsFormArray } from './get-beds-form-array';
import { createBedFormGroup } from './create-bed-form-group';

export function addBedFormGroup(bed: FormGroup): void {
  getBedsFormArray(bed).push(createBedFormGroup());
}
