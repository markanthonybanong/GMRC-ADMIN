import { Requests } from '../types/requests';


export class LoginStoreState {
  superAdminLogin = false;
  adminLogin = false;
  requests: Requests = {
    login: {
    },
    createAdminAccount: {
    }
  };
}
