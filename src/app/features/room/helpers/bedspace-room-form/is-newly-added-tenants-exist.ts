import { Room } from '../../types/room/room';
import { getAddedTenantObjectdIds } from '../get-added-tenant-objectd-ids';

export function isNewlyAddedTenantsExist(newlyAddedTenantsObjArr: Array<string>, rooms: Array<Room>): boolean {
  let exist = false;
  const addedIds: Array<string> = getAddedTenantObjectdIds(rooms);
  for (const id of newlyAddedTenantsObjArr) {
    if (addedIds.includes(id)) {
      exist = true;
      break;
    }
  }
  return exist;
}
