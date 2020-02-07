import { FormGroup } from '@angular/forms';
import { Tenant } from '../../../types/tenant/tenant';
export function setTenantFormValues(tenantForm: FormGroup, tenant: Tenant): void {
  tenantForm.patchValue({
    tenantImage: tenant.tenantImage,
    firstname: tenant.firstname,
    middlename: tenant.middlename,
    lastname: tenant.lastname,
    age: tenant.age,
    gender: tenant.gender,
    typeOfNetwork: tenant.typeOfNetwork,
    contactNumber: tenant.contactNumber,
    emergencyContactNumber: tenant.emergencyContactNumber,
    roomNumber: tenant.roomNumber,
    dueRentDate: tenant.dueRentDate,
    address: tenant.address,
    _id: tenant._id
  });
}
