import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export function createPartialPaymentFormGroup(): FormGroup {
    return new FormBuilder().group({
        date: [null, Validators.required],
        amount: [null, Validators.required]
    });
}
