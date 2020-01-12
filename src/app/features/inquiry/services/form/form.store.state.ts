import { Inquiry } from '../../types/inquiry';
import { FormRequests } from '../../types/form-requests';

export class FormStoreState {
  add = true;
  requests: FormRequests = {
    submit: {
    },
    inquiry: {
      inProgress: false,
    }
  };

}
