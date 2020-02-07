import { ROOM_CONFIG } from '../../../room.config';
import { Table } from '@gmrc-admin/shared/types';
import { Room } from '../../../types/room/room';
import { Requests } from '../../../types/requests';

export class BedspaceRoomStoreState {
  table: Table<Room> = {
    pageRequest: {
      page: 1,
      limit: 10,
      filters: {
        type: ROOM_CONFIG.filter.type.BEDSPACEROOMS,
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
