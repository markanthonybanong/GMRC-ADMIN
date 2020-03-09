import { Requests } from '../../../types/requests';
import { PageRequest } from '@gmrc-admin/shared/types';
import { PAYMENT_CONFIG } from '../../../payment.config';

export class EntryFormStoreState {
    pageRequest: PageRequest = {
        page: null,
        limit: null,
        filters: {
          type: PAYMENT_CONFIG.filter.type.ENTRYBYOBJECTID,
          entryObjectId: null,
        }
    };
    isUpdate: boolean;
    requests: Requests = {
      entryPayments: {
        success: true
      },
      submit: {
      },
    };
}
