import { Tenant } from 'src/app/features/tenant/types/tenant/tenant';

export interface Away {
  inDate: any;
  inTime: any;
  outDate: any;
  outTime: string;
  tenant: Tenant;
  tenantObjectId?: string;
  status: string;
  willReturnIn: any;
  dueRentDate: number;
  rent: number;
  fromServer?: boolean;
}
