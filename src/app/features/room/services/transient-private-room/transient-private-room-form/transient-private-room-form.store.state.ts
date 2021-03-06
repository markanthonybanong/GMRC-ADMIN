import { PageRequest } from '@gmrc-admin/shared/types';
import { Requests } from '../../../types/requests';


export class TransientPrivateRoomFormStoreState {
  pageRequest: PageRequest = {
    page: null,
    limit: null,
    filters: {
      type: null,
      roomObjectId: null,
    }
  };
  requests: Requests = {
    rooms: {
    },
    submit: {
    }
  };
}
