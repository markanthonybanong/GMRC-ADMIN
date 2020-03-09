import { PAYMENT_CONFIG } from '../../../payment.config';
import { Requests } from '../../../types/requests';
import { PageRequest } from '@gmrc-admin/shared/types';
import { RoomTenant } from '../../../types/roomPayment/room-tenant';

export class RoomFormStoreState {
    pageRequest: PageRequest = {
        page: null,
        limit: null,
        filters: {
          type: PAYMENT_CONFIG.filter.type.ROOMPAYMENTBYOBJECTID,
          entryObjectId: null,
        }
    };
    isUpdate: boolean;
    requests: Requests = {
      roomPayments: {
        success: true
      },
      submit: {
      },
    };
    roomTenants: Array<RoomTenant>           = [];
    roomTenantsDataSource: Array<RoomTenant> = [];
}
