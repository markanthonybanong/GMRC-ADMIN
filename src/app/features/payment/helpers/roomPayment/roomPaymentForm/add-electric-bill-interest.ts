import { RoomPayment } from '../../../types/roomPayment/room-payment';
import { DataRoomPaymentService } from '@gmrc-admin/shared/services';
import { PaymentStatus, Interest } from '../../../payment.enums';
import { addPercent } from './add-percent';

export function addElectricBillInterest(roomPayment: RoomPayment, dataRoomPaymentService: DataRoomPaymentService): void {
    if(roomPayment.electricBillStatus === PaymentStatus.UNPAID) {
        const currentDate = dataRoomPaymentService.currentDate;
        if(  currentDate >= 6 && currentDate <= 10 && roomPayment.electricBillInterest !== Interest.PLUSFIVEPERCENT) {
            roomPayment.totalAmountElectricBill            = addPercent(roomPayment.totalAmountElectricBill, 5);
            dataRoomPaymentService.electricBillPlaceHolder = 'Electric bill +5% interest';
        }  else if ( currentDate >= 11 && currentDate <= 15 && roomPayment.electricBillInterest !== Interest.PLUSTENPERCENT) {
            roomPayment.totalAmountElectricBill            = addPercent(roomPayment.totalAmountElectricBill, 10);
            dataRoomPaymentService.electricBillPlaceHolder = 'Electric bill +10% interest';
        } else if ( currentDate >= 16 && roomPayment.electricBillInterest !== Interest.PLUSFIFTEENPERCENT) {
            roomPayment.totalAmountElectricBill            = addPercent(roomPayment.totalAmountElectricBill, 15);
            dataRoomPaymentService.electricBillPlaceHolder = 'Electric bill +15% interest';
        }
    }
    
}
