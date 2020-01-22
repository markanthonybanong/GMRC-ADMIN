import { FormArray, FormGroup, Validators, FormBuilder } from '@angular/forms';

export function createTransientPrivateTenant(): FormGroup {
  return new FormBuilder().group({
    name: [null, Validators.required],
    _id: null,
  });
}
