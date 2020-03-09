import { PageData } from '@gmrc-admin/shared/types';
import { RoomPayment } from '../../../types/roomPayment/room-payment';
import { RoomTenant } from '../../../types/roomPayment/room-tenant';
import { PaymentStatus } from '../../../payment.enums';

export function modifyRoomPaymentObj(pageData: PageData<RoomPayment>): PageData<RoomPayment> {
    pageData.data.map((roomPayment) => {
        roomPayment.tenantsRiceCookerBillStatuses = setTenantsRiceCookerBillStatus(roomPayment.roomTenants);
        roomPayment.tenantsRoomRentStatuses       = setTenantsRoomRentStatus(roomPayment.roomTenants);
    });
    return pageData;
}

function setTenantsRiceCookerBillStatus(roomTenants: Array<RoomTenant>): Array<string> {
    const riceCookerBillStatuses: Array<string> = [];
    const statuses: Array<string> = [];
    roomTenants.forEach(tenant => {
      riceCookerBillStatuses.push(tenant.riceCookerBillStatus.value);
    });
    if (riceCookerBillStatuses.includes(PaymentStatus.PAID)) {
      statuses.push(PaymentStatus.PAID);
    }
    if (riceCookerBillStatuses.includes(PaymentStatus.UNPAID)) {
      statuses.push(PaymentStatus.UNPAID);
    }
    if (riceCookerBillStatuses.includes(PaymentStatus.BALANCE)) {
      statuses.push(PaymentStatus.BALANCE);
    }
    if (riceCookerBillStatuses.includes(PaymentStatus.NONE)) {
      statuses.push(PaymentStatus.NONE);
    }
    return statuses;
}

function setTenantsRoomRentStatus(roomTenants: Array<RoomTenant>): Array<string> {
    const tenantstatuses: Array<string> = [];
    const roomStatuses:   Array<string> = [];

    roomTenants.forEach(roomTenant => {
      tenantstatuses.push(roomTenant.rentStatus.value);
    });

    if (tenantstatuses.includes(PaymentStatus.PAID)) {
      roomStatuses.push(PaymentStatus.PAID);
    }
    if (tenantstatuses.includes(PaymentStatus.UNPAID)) {
      roomStatuses.push(PaymentStatus.UNPAID);
    }
    if (tenantstatuses.includes(PaymentStatus.BALANCE)) {
      roomStatuses.push(PaymentStatus.BALANCE);
    }
    if (tenantstatuses.includes(PaymentStatus.NONE)) {
      roomStatuses.push(PaymentStatus.NONE);
    }
    if (tenantstatuses.includes(PaymentStatus.USEDONEMONTHADVANCE)) {
      roomStatuses.push(PaymentStatus.USEDONEMONTHADVANCE);
    }
    return roomStatuses;
}