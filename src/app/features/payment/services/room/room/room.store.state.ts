import { Requests } from '../../../types/requests';
import { RoomPayment } from '../../../types/roomPayment/room-payment';
import { Table } from '@gmrc-admin/shared/types';
import { PAYMENT_CONFIG } from '../../../payment.config';

export class RoomStoreState {
  table: Table<RoomPayment> = {
      pageRequest: {
        page: 1,
        limit: 10,
        filters: {
          type: PAYMENT_CONFIG.filter.type.ALLROOMPAYMENTS
        }
      },
      totalCount: null,
      dataSource: [],
  };
  requests: Requests = {
    roomPayments: {
    }
  };
}
