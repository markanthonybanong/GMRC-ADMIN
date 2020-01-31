import { Room } from 'src/app/features/room/types/room/room';

export function enumsToArray(enums: object): Array<string> {
  return Object.keys(enums).map((key) => {
    return enums[key];
  });
}
export function isArrayUnique(array: Array<string>): boolean {
  return array.length === new Set(array).size;
}
//TODO: transer this to room helpers
export function getRoomNumbers(rooms: Array<Room>): Array<number> {
  const numbers: Array<number> = [];
  rooms.forEach( room => {
    numbers.push(room.number);
  });
  return numbers;
}
export function getFloorNumbers(rooms: Array<Room>): Array<number> {
  const numbers: Array<number> = [];
  rooms.forEach( room => {
    if (room.floor !== null && !numbers.includes(room.floor)) {
      numbers.push(room.floor);
    }
  });
  return numbers;
}
