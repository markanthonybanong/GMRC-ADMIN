export function addPercent(numberToAddPercent: number, percent: number): number {
    const decimal              = percent / 100;
    const addOneToDecimalValue = decimal + 1;
    const numberWithAddedPercent = numberToAddPercent * addOneToDecimalValue;
    return Math.round(numberWithAddedPercent);
  }