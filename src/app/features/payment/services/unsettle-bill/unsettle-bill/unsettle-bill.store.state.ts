import { Table } from '@gmrc-admin/shared/types';
import { UnsettleBillPayment } from '../../../types/unsettleBillPayment/unsettle-bill-payment';
import { PAYMENT_CONFIG } from '../../../payment.config';
import { Requests } from '../../../types/requests';

export class UnsettleBillStoreState {
    table: Table<UnsettleBillPayment> = {
        pageRequest: {
          page: 1,
          limit: 10,
          filters: {
            type: PAYMENT_CONFIG.filter.type.ALLUNSETTLEBILLS,
          }
        },
        totalCount: null,
        dataSource: [],
    };
    requests: Requests = {
      unsettleBillPayments: {
           
      }
    };
}
