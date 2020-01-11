import { Inquiry } from '../../types/inquiry';
import { FormRequests } from '../../types/form-requests';

export class FormStoreState {
  inquiry: Inquiry;
  requests: FormRequests = {
    submit: {
    }
  };
}
