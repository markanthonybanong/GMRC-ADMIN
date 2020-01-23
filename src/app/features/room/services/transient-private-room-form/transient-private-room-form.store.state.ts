import { PageRequest } from '@gmrc-admin/shared/types';


export class TransientPrivateRoomFormStoreState {
  pageRequest: PageRequest = {
    page: null,
    limit: null,
    filters: {
      type: null,
      roomObjectId: null,
    }
  };
  addedTenantsObjectIds: Array<string>;
  requests: object  = {
    submit: {
    }
  };
}
