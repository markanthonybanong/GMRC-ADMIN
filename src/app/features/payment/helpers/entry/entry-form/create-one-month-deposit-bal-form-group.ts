import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export function createBalanceFormGroup(): FormGroup {
    return new FormBuilder().group({
        balance: [null, Validators.required]
      });
}
