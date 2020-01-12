import { Inquiry } from '../../types/inquiry';
import { FormRequests } from '../../types/form-requests';

export class FormStoreState {
  requests: FormRequests = {
    submit: {
    },
    inquiry: {
      inProgress: false,

    }
  };

}
