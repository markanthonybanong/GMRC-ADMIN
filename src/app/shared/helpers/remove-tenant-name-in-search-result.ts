export function removeTenantNameInSearchResult(searchResult: object): object{
    const filteredSearchResult = {};
    Object.entries(searchResult).forEach( element => {
      if (element[0] !== 'tenantName') {
        filteredSearchResult[element[0]] = element[1];
      }
    });
    return filteredSearchResult;
}
