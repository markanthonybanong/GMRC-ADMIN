import { PenaltyPayment } from '../../../types/penaltyPayment/penaltyPayment';
import { Table } from '@gmrc-admin/shared/types';
import { PAYMENT_CONFIG } from '../../../payment.config';
import { Requests } from '../../../types/requests';
 

export class PenaltyStoreState {
    table: Table<PenaltyPayment> = {
        pageRequest: {
          page: 1,
          limit: 10,
          filters: {
            type: PAYMENT_CONFIG.filter.type.ALLPENALTIES,
          }
        },
        totalCount: null,
        dataSource: [],
      };
      requests: Requests  = {
        penaltyPayments: {
            
        }
      };
}
