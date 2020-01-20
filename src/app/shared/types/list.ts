import { PageRequest } from './page-request';
export interface Table<T> {
  pageRequest: PageRequest;
  totalCount: number;
  dataSource: Array<T>;
}
