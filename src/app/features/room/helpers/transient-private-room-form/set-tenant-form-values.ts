import { Tenant } from 'src/app/features/tenant/types/tenant';
import { FormGroup, FormBuilder } from '@angular/forms';
import { getTenantsInTenantForm } from './get-tenants-in-tenant-form';

export function setTenantFormValues(form: FormGroup, tenants: Array<Tenant>): void {
 tenants.forEach(tenant => {
  getTenantsInTenantForm(form).push(
    new FormBuilder().group({
      name: `${tenant.firstname} ${tenant.middlename} ${tenant.lastname}`,
      isAdded: true,
      tenantObjectId: tenant._id
    })
  );
 });
}
