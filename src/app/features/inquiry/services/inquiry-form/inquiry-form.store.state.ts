import { InqiryFormRequests } from '../../types/inquiry-form-requests';
import { PageRequest } from '@gmrc-admin/shared/types';


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
  requests: InqiryFormRequests = {
    submit: {
    },
    inquiry: {
      success: true,
    }
  };

}
