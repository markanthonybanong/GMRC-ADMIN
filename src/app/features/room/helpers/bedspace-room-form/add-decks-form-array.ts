import { FormArray } from '@angular/forms';
import { createDeckFormGroup } from './create-deck-form-group';

export function addDecksFormArray(): FormArray {
  const decks = new FormArray([]);
  for (let i = 0; i <= 2; i++) {
    decks.push(createDeckFormGroup());
  }
  return decks;
}
