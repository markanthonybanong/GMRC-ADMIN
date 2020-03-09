import { Tenant } from 'src/app/features/tenant/types/tenant/tenant';

export interface EntryPayment {
  roomNumber: number;
  tenant: Array<Tenant>;
  monthlyRent: number;
  key: string;
  dateEntry: any;
  dateExit: Date;
  oneMonthDeposit: string;
  oneMonthDepositBalance: Array<{balance: number}>;
  oneMonthAdvance: string;
  oneMonthAdvanceBalance: Array<{balance: number}>;
  partialPayments: Array<{date: Date, amount: number}>;
  _id: string;
}
