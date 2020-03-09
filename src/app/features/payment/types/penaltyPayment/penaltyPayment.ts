import { Tenant } from 'src/app/features/tenant/types/tenant/tenant';

export interface PenaltyPayment {
    roomNumber: number;
    date: any;
    tenant: Tenant;
    tenantObjectId: string;
    violation: string;
    fine: number;
    paymentStatus: string;
    paymentBalance: Array<{balance: number}>;
    _id: string;
}