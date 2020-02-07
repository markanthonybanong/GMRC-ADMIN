import { Bedspace } from './bedspace';
import { Tenant } from 'src/app/features/tenant/types/tenant/tenant';

export interface Room {
  number: number;
  floor: number;
  type: string;
  aircon: string;
  roomProperties: [{
    status: string,
    dueRentDate: number,
    monthlyRent: number,
    riceCookerBill: number,
    tenants: Array<Tenant>;
  }];
  bedspaces: Bedspace[];
  tenantsArr: Tenant[];
  _id: string;
}
