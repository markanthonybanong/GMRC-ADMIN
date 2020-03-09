export function setRoomPaymentFilter(searchResult: object): object {
    const arrangedSearchResult = { firstFilter: {}, secondFilter: {}};
    Object.entries(searchResult).forEach( element => {
      const searchType: string  = element[0];
      const searchValue: string = element[1];
      if ( searchType !== 'rentStatus' && searchType !== 'riceCookerBillStatus') {
        arrangedSearchResult.firstFilter[searchType] = searchValue;
      } else if(searchType === 'rentStatus') {
        arrangedSearchResult.firstFilter['rentStatus'] = true;
        arrangedSearchResult.secondFilter[searchType]  = searchValue;
      } else if(searchType === 'riceCookerBillStatus') {
        arrangedSearchResult.firstFilter['riceCookerBillStatus'] = true;
        arrangedSearchResult.secondFilter[searchType]  = searchValue;
      }
    });
    return arrangedSearchResult;
}
