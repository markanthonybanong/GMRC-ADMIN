import { DataRoomPaymentService } from '@gmrc-admin/shared/services';
import { RoomPayment } from '../../../types/roomPayment/room-payment';
import { PaymentStatus, Interest } from '../../../payment.enums';
import { RoomType } from 'src/app/features/room/room.enums';
import { RoomTenant } from '../../../types/roomPayment/room-tenant';
import { addPercent } from './add-percent';

export function addWaterBillInterest(roomPayment:RoomPayment, dataRoomPaymentService: DataRoomPaymentService): void {
    if (roomPayment.waterBillStatus === PaymentStatus.UNPAID && roomPayment.roomType !== RoomType.BEDSPACE ) {
      const dueDate = dataRoomPaymentService.currentDate - roomPayment.roomTenants[0].dueRentDate;
      if (dueDate >= 8 && dueDate <= 10) {
        roomPayment.waterBill                       = addPercent(roomPayment.waterBill, 10);
        dataRoomPaymentService.waterBillPlaceHolder = 'Water bill +10% interest';
      } else if (dueDate >= 11 && dueDate <= 15) {
        roomPayment.waterBill                       = addPercent(roomPayment.waterBill, 15);
        dataRoomPaymentService.waterBillPlaceHolder = 'Water bill +15% interest';
      } else if (dueDate >= 16) {
        roomPayment.waterBill                       = addPercent(roomPayment.waterBill, 20);
        dataRoomPaymentService.waterBillPlaceHolder = 'Water bill +20% interest';
      }
    }
}
