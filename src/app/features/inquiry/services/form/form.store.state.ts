import { Inquiry } from '../../types/inquiry';
import { FormRequests } from '../../types/form-requests';
import { FormGroup } from '@angular/forms';

export class FormStoreState {
  requests: FormRequests = {
    submit: {
    },
    inquiry: {
    }
  };

}
