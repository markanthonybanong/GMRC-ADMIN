export function enumsToArray(enums: object): Array<string> {
  return Object.keys(enums).map((key) => {
    return enums[key];
  });
}
export function isArrayUnique(array: Array<string>): boolean {
  return array.length === new Set(array).size;
}

