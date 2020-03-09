import { RoomPayment } from '../../../types/roomPayment/room-payment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { electricBillBalanceFormArr } from './electric-bill-balance-form-arr';
import { waterBillBalanceFormArr } from './water-bill-balance-form-arr';

export function setRoomPaymentFormValues(roomPaymentForm: FormGroup, roomPayment: RoomPayment): void {
    const formBuilder = new FormBuilder();
    if (roomPayment.electricBillBalance.length) {
        electricBillBalanceFormArr(roomPaymentForm).push(
            formBuilder.group({
                balance: roomPayment.electricBillBalance[0].balance,
            })
        );
    }
    if (roomPayment.waterBillBalance.length) {
        waterBillBalanceFormArr(roomPaymentForm).push(
            formBuilder.group({
                alance: roomPayment.waterBillBalance[0].balance,
            })
      );
    }
    roomPaymentForm.patchValue({
      amountKWUsed: roomPayment.amountKWUsed,
      date: roomPayment.date,
      total: roomPayment.total,
      electricBillStatus: roomPayment.electricBillStatus,
      totalAmountElectricBill: roomPayment.totalAmountElectricBill,
      electricBillInterest: roomPayment.electricBillInterest,
      presentReading: roomPayment.presentReading,
      presentReadingKWUsed: roomPayment.presentReadingKWUsed,
      previousReading: roomPayment.previousReading,
      previousReadingKWUsed: roomPayment.previousReadingKWUsed,
      roomNumber: roomPayment.roomNumber,
      waterBillStatus: roomPayment.waterBillStatus,
      waterBill: roomPayment.waterBill,
      waterBillInterest: roomPayment.waterBillInterest,
      roomTenants: roomPayment.roomTenants,
      roomType: roomPayment.roomType,
      _id: roomPayment._id,
    });
}
