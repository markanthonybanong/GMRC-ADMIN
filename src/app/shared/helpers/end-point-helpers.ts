import { StoreRequestStateUpdater } from '@gmrc-admin/shared/types';

export function getStoreRequestStateUpdater(
  store: any,
): StoreRequestStateUpdater {
  return (requestName, requestState) => {
      store.setState({
          ...store.state,
          requests: {
              ...store.state.requests,
              [requestName]: requestState,
          },
      });
  };
}
