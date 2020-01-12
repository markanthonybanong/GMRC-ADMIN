import { Requests } from '../types/requests';


export class FormStoreState {
  superAdminLogin = false;
  requests: Requests = {
    login: {
    },
    createAdminAccount: {
    }
  };
}
