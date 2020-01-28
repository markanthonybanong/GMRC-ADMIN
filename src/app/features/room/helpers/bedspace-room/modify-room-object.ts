import { PageData } from '@gmrc-admin/shared/types';
import { Room } from '../../types/room/room';
import { toDateString } from '@gmrc-admin/shared/helpers';

export function modifyRoomObjectForBedspace(pageData: PageData<Room>): PageData<Room> {
  pageData.data.map(room => {
    room.bedspaces.map(bedspace => {
      bedspace.decks.map( deck => {
        if (deck.away !== null) {
          deck.away.map( away => {
            away.willReturnIn = toDateString(away.willReturnIn);
            away.inDate = toDateString(away.inDate);
            away.outDate = toDateString(away.outDate);
          });
        }
      });
    });
  });
  return pageData;
}
