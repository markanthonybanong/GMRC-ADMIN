import { FormGroup } from '@angular/forms';
import { getTenantsInTenantForm } from './get-tenants-in-tenant-form';

export function getTenantFormGroupInTenantForm(form: FormGroup, index: number): FormGroup {
  return getTenantsInTenantForm(form).at(index) as FormGroup;
}
