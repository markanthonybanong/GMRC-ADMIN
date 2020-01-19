export function removeEmptyKeys(obj: object): object {
  const filteredObj = {};
  Object.entries(obj).forEach( element => {
    if (element[1] !== null) {
      filteredObj[element[0]] = element[1];
    }
  });
  return filteredObj;
}
