import { Inquiry } from '../../types/inquiry';
import { ListRequests } from '../../types/list-requests';
import { INQUIRY_CONFIG } from '../../inquiry.config';
import { MatTableDataSource } from '@angular/material';
import { Table } from '@gmrc-admin/shared/types';

export class ListStoreState {
  table: Table<Inquiry> = {
    pageRequest: {
      page: 1,
      limit: 2,
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
