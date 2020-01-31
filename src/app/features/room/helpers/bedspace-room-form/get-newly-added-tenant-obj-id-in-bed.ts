import { Bedspace } from '../../types/room/bedspace';
export function getNewlyAddedTenantObjIdInBed(bed: Bedspace): Array<string> {
  const ids: Array<string> = [];
  bed.decks.forEach((deck) => {
    if (deck.tenantObjectId !== null && deck.fromServer === false) {
      ids.push(deck.tenantObjectId);
    }
    if (deck.away.length) {
      deck.away.forEach((away) => {
        if (away.tenantObjectId !== null && away.fromServer === false) {
          ids.push(away.tenantObjectId);
        }
      });
    }
  });
  return ids;
}
