import { PageRequest } from './page-request';

export interface List<T> {
  pageRequest: PageRequest;
  totalCount: number;
  dataSource: Array<T>;
}
