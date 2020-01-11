import { Inquiry } from '../../types/inquiry';
import { ListRequests } from '../../types/list-requests';

export class ListStoreState {
  dataSource: Array<Inquiry>;
  totalCount: number;
  requests: ListRequests = {
    list: {
    }
  };
}
