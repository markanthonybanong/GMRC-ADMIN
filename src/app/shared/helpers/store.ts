import { Store } from 'rxjs-observable-store';
import { PageData } from '../types';
import { Subject } from 'rxjs';

export function updateState(store: Store<any>, pageData: PageData<any>) {
  store.setState({
    ...store.state,
    table: {
      ...store.state.table,
      totalCount: pageData.totalCount,
      dataSource: pageData.data
    }
  });
}
export function reloadTable(reloadTable$: Subject<undefined>): void {
  reloadTable$.next();
}
