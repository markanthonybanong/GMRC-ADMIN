import { FormRequests } from '../../types/form-requests';
import { ActionResponseModal, PageRequest } from '@gmrc-admin/shared/types';
import { INQUIRY_CONFIG } from '../../inquiry.config';

export class FormStoreState {
  pageRequest: PageRequest = {
    page: null,
    limit: null,
    filters: {
      type: null,
      inquiryObjectId: null,
    }
  };
  update = false;
  requests: FormRequests = {
    submit: {
    },
    inquiry: {
      success: true,
    }
  };

}
