import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { addDecksFormArray } from './add-decks-form-array';

export function createBedFormGroup(): FormGroup {
  const formBuilder = new FormBuilder();
  return formBuilder.group({
    number: [null, Validators.required],
    decks: addDecksFormArray(),
  });
}
