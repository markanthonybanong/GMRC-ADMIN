import { Tenant } from 'src/app/features/tenant/types/tenant/tenant';

export interface UnsettleBillPayment {
    roomNumber: number;
    roomType: number;
    tenants: Array<Tenant>;
    tenantsObjectId: Array<string>;
    dueDate: number;
    dateExit: Date;
    rentBalance: number;
    electricBillBalance: number;
    waterBillBalance: number;
    riceCookerBillBalance: number;
    _id: string;
}
