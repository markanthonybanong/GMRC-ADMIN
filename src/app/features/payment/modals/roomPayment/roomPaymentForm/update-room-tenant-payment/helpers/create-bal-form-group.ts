import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export function createBalFormGroup(): FormGroup {
    return new FormBuilder().group({
        balance: [null, Validators.required]
      });
}
