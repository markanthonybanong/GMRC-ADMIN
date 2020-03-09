import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export function createBalanceFormGroup(): FormGroup {
    return new FormBuilder().group({
        balance: [null, Validators.required]
      });
}
