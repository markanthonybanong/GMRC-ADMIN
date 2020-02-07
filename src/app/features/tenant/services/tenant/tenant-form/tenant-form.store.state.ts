import { PageRequest } from '@gmrc-admin/shared/types';
import { Requests } from '../../../types/requests';

export class TenantFormStoreState {
  pageRequest: PageRequest = {
    page: null,
    limit: null,
    filters: {
      type: null,
      tenantObjectId: null,
    }
  };
  isUpdate: boolean;
  requests: Requests = {
    submit: {
    },
    tenants: {
      success: true,
    }
  };
}
