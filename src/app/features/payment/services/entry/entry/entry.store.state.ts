import { PAYMENT_CONFIG } from '../../../payment.config';
import { Table } from '@gmrc-admin/shared/types';
import { Requests } from '../../../types/requests';
import { EntryPayment } from '../../../types/entryPayment/entryPayment';

export class EntryStoreState {
  table: Table<EntryPayment> = {
      pageRequest: {
        page: 1,
        limit: 10,
        filters: {
          type: PAYMENT_CONFIG.filter.type.ALLENTRIES,
        }
      },
      totalCount: null,
      dataSource: [],
  };
  requests: Requests = {
       entryPayments: {
         
       }
  };
}
