import { FormGroup, FormArray } from '@angular/forms';
import { getDeckFormGroup } from './get-deck-form-group';

export function getAwayFormArray(bedForm: FormGroup, bedIndex: number, deckIndex: number): FormArray {
  return getDeckFormGroup(bedForm, bedIndex, deckIndex).get('away') as FormArray;
}
