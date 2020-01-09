import { InquiryListRequests } from '../../types/inquiry-list-requests';
import { Inquiry } from '../../types/inquiry';

export class InquiryListStoreState {
  dataSource: Array<Inquiry>;
  totalCount: number;
  requests: InquiryListRequests = {
    list: {
    }
  };
}
