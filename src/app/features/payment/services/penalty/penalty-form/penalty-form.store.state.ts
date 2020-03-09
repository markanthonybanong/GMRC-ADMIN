import { PAYMENT_CONFIG } from '../../../payment.config';
import { PageRequest } from '@gmrc-admin/shared/types';
import { Requests } from '../../../types/requests';

export class PenaltyFormStoreState {
    pageRequest: PageRequest = {
        page: null,
        limit: null,
        filters: {
          type: PAYMENT_CONFIG.filter.type.PENALTYBYOBJECTID,
          penaltyObjectId: null,
        }
    };
    isUpdate: boolean;
    requests: Requests = {
      penaltyPayments: {
        success: true
      },
      submit: {
      },
    };
}
