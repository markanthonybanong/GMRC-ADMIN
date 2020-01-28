import { Table } from '@gmrc-admin/shared/types';
import { Room } from '../../types/room/room';
import { ROOM_CONFIG } from '../../room.config';
import { Requests } from '../../types/requests';
export class TransientPrivateRoomStoreState {
  table: Table<Room> = {
    pageRequest: {
      page: 1,
      limit: 10,
      filters: {
        type: ROOM_CONFIG.filters.types.TRANSIENTPRIVATEROOMS,
      }
    },
    totalCount: null,
    dataSource: [],
  };
  requests: Requests = {
    rooms: {
    }
  };
}
