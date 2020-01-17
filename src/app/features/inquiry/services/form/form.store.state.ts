import { FormRequests } from '../../types/form-requests';
import { ActionResponseModal, PageRequest } from '@gmrc-admin/shared/types';
import { INQUIRY_CONFIG } from '../../inquiry.config';

export class FormStoreState {
  pageRequest: PageRequest = {
    page: null,
    limit: null,
    filters: {
      type: INQUIRY_CONFIG.filters.types.INQUIRYBYOBJECTID,
    }

  }
  add = true;
  requests: FormRequests = {
    submit: {
    },
    inquiry: {
      success: true,
    }
  };

}
