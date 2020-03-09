import { PAYMENT_CONFIG } from '../../../payment.config';
import { Requests } from '../../../types/requests';
import { PageRequest } from '@gmrc-admin/shared/types';

export class UnsettleBillFormStoreState {
    pageRequest: PageRequest = {
        page: null,
        limit: null,
        filters: {
          type: PAYMENT_CONFIG.filter.type.UNSETTLEBILLBYOBJECTID,
          unsettleBillObjectId: null,
        }
    };
    isUpdate: boolean;
    requests: Requests = {
      unsettleBillPayments: {
        success: true
      },
      submit: {
      },
    };
}
