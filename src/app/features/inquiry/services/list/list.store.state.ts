import { Inquiry } from '../../types/inquiry';
import { ListRequests } from '../../types/list-requests';
import { INQUIRY_CONFIG } from '../../inquiry.config';
import { Table } from '@gmrc-admin/shared/types';

export class ListStoreState {
  table: Table<Inquiry> = {
    pageRequest: {
      page: 1,
      limit: 10,
      filters: {
        type: INQUIRY_CONFIG.filters.types.ALLINQUIRIES,
      }
    },
    totalCount: null,
    dataSource: [],
  };
  requests: ListRequests = {
    list: {
    }
  };
}
