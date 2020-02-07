import { ROOM_CONFIG } from '../../../room.config';

export function modifyBedspaceSearchResult(searchResult: object): object {
  const search = { roomFilter: {}, bedspaceFilter: {}, type: ROOM_CONFIG.filter.type.ADVANCESEARCHBEDSPACEROOMS};
  const roomSearch = ['number', 'floor', 'aircon'];
  Object.entries(searchResult).forEach(entry => {
    const key   = entry[0];
    const value = entry[1];
    if (roomSearch.includes(key)) {
      search.roomFilter[key] = value;
    } else {
      search.bedspaceFilter[key] = value;
    }
  });
  return search;
}
