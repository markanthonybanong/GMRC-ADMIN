import { FormGroup, FormBuilder } from '@angular/forms';
import { PenaltyPayment } from '../../../types/penaltyPayment/penaltyPayment';
import { getPaymentBalanceFormArr } from './get-payment-balance-form-arr';

export function setPenaltyFormValues(penaltyForm: FormGroup, penaltyPayment: PenaltyPayment):void {
    if(penaltyPayment.paymentBalance.length) {
        getPaymentBalanceFormArr(penaltyForm).push( 
            new FormBuilder().group({
                balance: penaltyPayment.paymentBalance[0].balance,
            })
        );
    }
    penaltyForm.patchValue({
        roomNumber: penaltyPayment.roomNumber,
        date: penaltyPayment.date,
        tenant: `${penaltyPayment.tenant[0].firstname} ${penaltyPayment.tenant[0].middlename} ${penaltyPayment.tenant[0].lastname}`,
        tenantObjectId: penaltyPayment.tenant[0]._id,
        violation: penaltyPayment.violation,
        fine: penaltyPayment.fine,
        paymentStatus: penaltyPayment.paymentStatus,
        _id: penaltyPayment._id,
    });
}
