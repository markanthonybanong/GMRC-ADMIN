import { TransientPrivateRoomFormStoreState } from '../../services/transient-private-room-form/transient-private-room-form.store.state';
import { Store } from 'rxjs-observable-store';

export function updateTransientPrivateRoomFormState(
  store: Store<TransientPrivateRoomFormStoreState>,
  objectIds: Array<any>): void {
    store.setState({
      ...store.state,
      addedTenantsObjectIds: objectIds
    });
}
