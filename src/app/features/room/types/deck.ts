import { Tenant } from '../../tenant/types/tenant';
import { Away } from './away';

export interface Deck {
  number?: number;
  status?: string;
  dueRentDate?: number;
  tenant?: Tenant;
  away?: Away[];
  _id?: string;
  riceCookerBill: number;
  tenantObjectId?: string;
  oldTenantObjectId?: string;
  monthlyRent?: number;
}
