import { PageRequest } from './page-request';
import { MatTableDataSource } from '@angular/material';
export interface Table<T> {
  pageRequest: PageRequest;
  totalCount: number;
  dataSource: Array<T>;
}
