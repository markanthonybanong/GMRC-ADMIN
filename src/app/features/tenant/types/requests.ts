import { RequestState } from '@gmrc-admin/shared/types';

export interface Requests {
  tenants: RequestState;
  submit?: RequestState;
}
