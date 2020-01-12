import { FormRequests } from '../../types/form-requests';
import { ActionResponseModal } from '@gmrc-admin/shared/types';

export class FormStoreState {
  add = true;
  actionResponse: ActionResponseModal = {};
  requests: FormRequests = {
    submit: {
    },
    inquiry: {
      success: true,
    }
  };

}
