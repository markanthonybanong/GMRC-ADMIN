import { Room } from '../types/room/room';
import { RoomType } from '../room.enums';


export function getAddedTenantObjectdIds(rooms: Array<Room>): Array<string> {
  const ids = [];
  rooms.forEach(room => {
    if (room.type === RoomType.PRIVATE || room.type === RoomType.TRANSIENT) {
      getPrivateTransientRoomTenantsObjectId(room, ids);
    } else if (room.type === RoomType.BEDSPACE) {
      getBedspaceRoomTenantsObjectId(room, ids);
    }
  });
  return ids;
}
function getPrivateTransientRoomTenantsObjectId(room: Room, ids: Array<string>): void {
  room.roomProperties[0].tenants.forEach( tenant => ids.push(tenant._id));
}
function getBedspaceRoomTenantsObjectId(room: Room, ids: Array<string>): void {
  if (room.bedspaces !== undefined) {
    room.bedspaces.forEach(bed => {
      bed.decks.forEach(deck => {
        if (deck.tenant !== null) {
          ids.push(deck.tenant._id);
        }
        if(deck.away !== null && deck.away[0].tenantObjectId !== null) {
          ids.push(deck.away[0].tenantObjectId);
        }
       });
    });
  }

}
