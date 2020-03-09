import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export function createTenantFormGroup(): FormGroup {
    return new FormBuilder().group({
        name: [null, Validators.required],
        fromServer: false,
        _id: null,
      });
}
