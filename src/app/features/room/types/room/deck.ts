import { Away } from './away';
import { Tenant } from 'src/app/features/tenant/types/tenant/tenant';
export interface Deck {
  number?: number;
  status?: string;
  dueRentDate?: number;
  tenant?: Tenant;
  away?: Away[];
  riceCookerBill?: number;
  tenantObjectId?: string;
  oldTenantObjectId?: string;
  monthlyRent?: number;
  fromServer?: boolean;

}
