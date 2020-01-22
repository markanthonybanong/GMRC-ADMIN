import { Store } from 'rxjs-observable-store';
import { PageData } from '../types';
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
