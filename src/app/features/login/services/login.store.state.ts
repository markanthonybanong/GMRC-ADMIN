import { Requests } from '../types/requests';


export class LoginStoreState {
  superAdminLogin = false;
  requests: Requests = {
    login: {
    },
    createAdminAccount: {
    }
  };
}
