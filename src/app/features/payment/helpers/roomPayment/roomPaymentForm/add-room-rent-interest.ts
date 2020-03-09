import { DataRoomPaymentService } from '@gmrc-admin/shared/services';
import { PaymentStatus, Interest } from '../../../payment.enums';
import { addPercent } from './add-percent';

export function addRoomRentInterest(dataRoomPaymentService: DataRoomPaymentService): void {
    dataRoomPaymentService.roomTenants.forEach(tenant => {
        if ( tenant.rentStatus.value === PaymentStatus.UNPAID) {
          const dateDifference = dataRoomPaymentService.currentDate - tenant.dueRentDate;
          if ( dateDifference >= 8 && dateDifference <= 10 && tenant.rentInterestAdded !== Interest.PLUSFIVEPERCENT) {
            tenant.rentToPay = addPercent(tenant.rent, 5);
            tenant.rentInterestAdded = Interest.PLUSFIVEPERCENT;
          } else if ( dateDifference >= 11 && dateDifference <= 15 && tenant.rentInterestAdded !== Interest.PLUSTENPERCENT) {
            tenant.rentToPay = addPercent(tenant.rent, 10);
            tenant.rentInterestAdded = Interest.PLUSTENPERCENT;
          } else if (dateDifference >= 16 && tenant.rentInterestAdded !== Interest.PLUSFIFTEENPERCENT) {
            tenant.rentToPay = addPercent(tenant.rent, 15);
            tenant.rentInterestAdded = Interest.PLUSFIFTEENPERCENT;
          }
        }
      });
}
