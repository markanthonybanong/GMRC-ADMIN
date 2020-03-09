import { UnsettleBillPayment } from '../../../types/unsettleBillPayment/unsettle-bill-payment';

export function setUnsettleBillObject(unsettleBillPayment: UnsettleBillPayment): UnsettleBillPayment {
    unsettleBillPayment.tenants.forEach(tenant => {
        unsettleBillPayment.tenantsObjectId.push(tenant._id)
    });
    return unsettleBillPayment;
}
