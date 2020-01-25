import { Room } from '../types/room/room';
import { RoomType } from '../room.enums';

export function getAddedTenantObjectdIds(rooms: Array<Room>): Array<string> {
  const ids = [];
  rooms.forEach(room => {
    if (room.type === RoomType.PRIVATE || room.type === RoomType.TRANSIENT) {
      room.roomProperties[0].tenants.forEach( tenant => ids.push(tenant._id));
    }
  });
  return ids;
}
