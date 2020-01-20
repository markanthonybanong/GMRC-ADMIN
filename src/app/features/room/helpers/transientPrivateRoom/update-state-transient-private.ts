import { TransientPrivateRoomStoreState } from '../../services/transient-private-room/transient-private-room.store.state';
import { PageData } from '@gmrc-admin/shared/types';
import { Room } from '../../types/room';
import { Store } from 'rxjs-observable-store';

export function updateStateTransientPrivate(store: Store<any>, pageData: PageData<any>) {
  store.setState({
    ...store.state,
    table: {
      ...store.state.table,
      totalCount: pageData.totalCount,
      dataSource: pageData.data
    }
  });


}
