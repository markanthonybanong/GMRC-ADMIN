import { Table } from '@gmrc-admin/shared/types';
import { INQUIRY_CONFIG } from '../../../inquiry.config';
import { Inquiry } from '../../../types/inquiry/inquiry';
import { Requests } from '../../../types/requests';

export class InquiryStoreState {
  table: Table<Inquiry> = {
    pageRequest: {
      page: 1,
      limit: 10,
      filters: {
        type: INQUIRY_CONFIG.filter.type.ALLINQUIRIES,
      }
    },
    totalCount: null,
    dataSource: [],
  };
  requests: Requests = {
    inquiries: {
    }
  };
}
