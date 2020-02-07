import { Table } from '@gmrc-admin/shared/types';
import { Tenant } from '../../../types/tenant/tenant';
import { TENANT_CONFIG } from '../../../tenant.config';
import { Requests } from '../../../types/requests';



export class TenantStoreState {
  table: Table<Tenant> = {
    pageRequest: {
      page: 1,
      limit: 10,
      filters: {
        type: TENANT_CONFIG.filter.type.ALLTENANTS,
      }
    },
    totalCount: null,
    dataSource: [],
  };
  requests: Requests  = {
    tenants: {}
  };
}
