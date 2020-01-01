import { Requests } from '../types/requests';


export class LoginStoreState {
  userType: string;
  requests: Requests = {
    login: {
      success: false
    }
  };
}
