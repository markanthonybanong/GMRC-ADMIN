import { FormGroup, FormArray } from '@angular/forms';

export function getTenantsInTenantForm(form: FormGroup): FormArray  {
  return form.get('tenants') as FormArray;
}
