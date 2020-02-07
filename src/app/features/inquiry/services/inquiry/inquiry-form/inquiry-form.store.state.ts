import { PageRequest } from '@gmrc-admin/shared/types';
import { Requests } from '../../../types/requests';

export class InquiryFormStoreState {
  pageRequest: PageRequest = {
    page: null,
    limit: null,
    filters: {
      type: null,
      inquiryObjectId: null,
    }
  };
  update = false;
  requests: Requests = {
    inquiries: {
      success: true,
    },
    submit: {
    },
  };

}
