import { Room } from '../types/room/room';
import { RoomType } from '../room.enums';

export function getAddedTenantObjectdIds(rooms: Array<Room>): Array<string> {
  const ids = [];
  console.log('the rooms here ', rooms);

  rooms.forEach(room => {
    if (room.type === RoomType.PRIVATE || room.type === RoomType.TRANSIENT) {
      room.roomProperties[0].tenants.forEach( tenant => ids.push(tenant._id));
    } else if (room.type === RoomType.BEDSPACE) {
      room.bedspaces.forEach(bed => {
        bed.decks.forEach(deck => {
          if (deck.tenant !== null) {
            ids.push(deck.tenant._id);
          }
         });
      });
    }
  });
  return ids;
}
