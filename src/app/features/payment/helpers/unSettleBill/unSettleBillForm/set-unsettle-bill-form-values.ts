import { FormGroup, FormBuilder } from '@angular/forms';
import { UnsettleBillPayment } from '../../../types/unsettleBillPayment/unsettle-bill-payment';
import { getTenantsFormArr } from './get-tenants-form-arr';

export function setUnsettleBillFormValues(unSettleBillForm: FormGroup, unSettleBillPayment: UnsettleBillPayment) {
    unSettleBillPayment.tenants.forEach( tenant => {
        getTenantsFormArr(unSettleBillForm).push(
          new FormBuilder().group({
            _id: tenant._id,
            name: `${tenant.firstname} ${tenant.middlename} ${tenant.lastname}`,
            fromServer: true,
          })
        );
      });
  
      unSettleBillForm.patchValue({
        roomNumber: unSettleBillPayment.roomNumber,
        roomType: unSettleBillPayment.roomType,
        dueDate: unSettleBillPayment.dueDate,
        dateExit: unSettleBillPayment.dateExit,
        rentBalance: unSettleBillPayment.rentBalance,
        electricBillBalance: unSettleBillPayment.electricBillBalance,
        waterBillBalance: unSettleBillPayment.waterBillBalance,
        riceCookerBillBalance: unSettleBillPayment.riceCookerBillBalance,
        _id: unSettleBillPayment._id
      });
}
