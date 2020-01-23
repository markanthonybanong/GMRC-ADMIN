import { Tenant } from 'src/app/features/tenant/types/tenant';

export interface Away {
  inDate: string;
  inTime: string;
  outDate: string;
  outTime: string;
  tenant: Tenant;
  tenantObjectId?: string;
  status: string;
  willReturnIn: string;
  dueRentDate: number;
  rent: number;
}
