import { PageRequest } from '@gmrc-admin/shared/types';
import { Requests } from '../../../types/requests';
import { Bedspace } from '../../../types/room/bedspace';

export class BedspaceRoomFormStoreState {
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
