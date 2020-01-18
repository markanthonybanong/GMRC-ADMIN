import { FormBuilder, Validators, FormGroup } from '@angular/forms';

export function createBedInfo(bedNum = null, deckNum = null): FormGroup {
  const formBuilder = new FormBuilder();
  return formBuilder.group({
    bedNumber: [bedNum, Validators.required],
    deckNumber: [deckNum, Validators.required]
  });
}
