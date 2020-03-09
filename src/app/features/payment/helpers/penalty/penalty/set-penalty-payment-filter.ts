export function setPenaltyPaymentFilter(searchResult: object): object {
    const arrangedSearchResult = { firstFilter: {}, secondFilter: {}};
    Object.entries(searchResult).forEach( element => {
      const searchType: string  = element[0];
      const searchValue: string = element[1];
      if ( searchType !== 'paymentStatus') {
        arrangedSearchResult.firstFilter[searchType] = searchValue;
      } else {
        arrangedSearchResult.firstFilter['paymentStatusFound'] = true;
        arrangedSearchResult.secondFilter[searchType]  = searchValue;
      }  
    });
    return arrangedSearchResult;
}
