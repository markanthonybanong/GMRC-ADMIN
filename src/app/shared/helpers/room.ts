import { Room } from 'src/app/features/room/types/room/room';

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
