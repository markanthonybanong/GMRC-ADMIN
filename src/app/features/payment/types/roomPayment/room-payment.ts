import { RoomTenant } from './room-tenant';

export interface RoomPayment {
    amountKWUsed: number;
    date: string;
    electricBillBalance: Array<{balance: number}>;
    electricBillStatus: string;
    presentReading: Date;
    presentReadingKWUsed: number;
    previousReading: Date;
    previousReadingKWUsed: number;
    roomNumber: number;
    waterBillBalance: Array<{balance: number}>;
    waterBillStatus: string;
    roomTenants: Array<RoomTenant>;
    total: number;
    totalAmountElectricBill: number;
    electricBillInterest: string;
    waterBill: number;
    waterBillInterest: string;
    roomType: string;
    tenantsRiceCookerBillStatuses?: Array<string>;
    tenantsRoomRentStatuses?: Array<string>;
    _id: string;
}
