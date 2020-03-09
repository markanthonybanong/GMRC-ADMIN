import { DataRoomPaymentService } from '@gmrc-admin/shared/services';
import { PaymentStatus, Interest } from '../../../payment.enums';
import { RoomType } from 'src/app/features/room/room.enums';
import { addPercent } from './add-percent';

export function addRiceCookerBillInterest(dataRoomPaymentService: DataRoomPaymentService, roomType: string): void {
    dataRoomPaymentService.roomTenants.forEach((tenant, index) => {
      if (tenant.rentStatus.value === PaymentStatus.UNPAID) {
        const dateDifference = dataRoomPaymentService.currentDate - tenant.dueRentDate;
        if (roomType === RoomType.BEDSPACE || index === 0) {
          if ( dateDifference >= 8 && dateDifference <= 10 && tenant.riceCookerBillInterestAdded !== Interest.PLUSTENPERCENT) {
            tenant.riceCookerBillToPay         = addPercent(tenant.riceCookerBill, 10);
            tenant.riceCookerBillInterestAdded = Interest.PLUSTENPERCENT;
          } else if ( dateDifference >= 11 && dateDifference <= 15 && tenant.riceCookerBillInterestAdded !== Interest.PLUSFIFTEENPERCENT) {
            tenant.riceCookerBillToPay         = addPercent(tenant.riceCookerBill, 15);
            tenant.riceCookerBillInterestAdded = Interest.PLUSFIFTEENPERCENT;
          } else if ( dateDifference >= 16 && tenant.riceCookerBillInterestAdded !== Interest.PLUSTWENTYPERCENT) {
            tenant.riceCookerBillToPay         = addPercent(tenant.riceCookerBill, 20);
            tenant.riceCookerBillInterestAdded = Interest.PLUSTENPERCENT;
          }
        }
      }
    });
}
