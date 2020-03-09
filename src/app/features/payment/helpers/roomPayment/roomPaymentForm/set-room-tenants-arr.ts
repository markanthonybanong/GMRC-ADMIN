import { RoomTenant } from '../../../types/roomPayment/room-tenant';

export function setRoomTenantsArr(roomTenantsArr: Array<RoomTenant>, dataServiceRoomTenantsArr: Array<RoomTenant>): void {
    roomTenantsArr.forEach( roomTenant => {
        dataServiceRoomTenantsArr.push(roomTenant);
    });
}
