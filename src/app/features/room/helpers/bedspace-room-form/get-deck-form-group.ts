import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { getBedFormGroup } from './get-bed-form-group';

export function getDeckFormGroup(bedForm: FormGroup, bedIndex: number, deckIndex: number): FormGroup {
  const bedFormGroup = getBedFormGroup(bedForm, bedIndex) as FormGroup;
  const decksFormArray = bedFormGroup.get('decks') as FormArray;
  return decksFormArray.at(deckIndex) as FormGroup;
}
