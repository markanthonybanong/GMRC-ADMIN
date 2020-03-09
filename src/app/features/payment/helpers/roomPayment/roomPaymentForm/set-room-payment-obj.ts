import { RoomPayment } from '../../../types/roomPayment/room-payment';
import { PageData } from '@gmrc-admin/shared/types';
import { DataRoomPaymentService } from '@gmrc-admin/shared/services';
import { addElectricBillInterest } from './add-electric-bill-interest';
import { addWaterBillInterest } from './add-water-bill-interest';

export function setRoomPaymentObj(pageData: PageData<RoomPayment>, dataRoomPaymentService: DataRoomPaymentService): PageData<RoomPayment> {
    pageData.data.map((roomPayment) => {
        addElectricBillInterest(roomPayment, dataRoomPaymentService);
        addWaterBillInterest(roomPayment, dataRoomPaymentService);
    });
    return pageData;
}


