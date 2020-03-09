import { RoomTenant } from '../../../types/roomPayment/room-tenant';
import { RoomType, DeckStatus } from 'src/app/features/room/room.enums';
import { Room } from 'src/app/features/room/types/room/room';
import { PaymentStatus, TenantType } from '../../../payment.enums';
import { addDeckTenantObjectId } from 'src/app/features/room/helpers/bedspace-room/bedspace-room-form/add-deck-tenant-object-id';

export function getRoomTenants(room: Room): Array<RoomTenant> {
    const roomTenants: Array<RoomTenant> = [];
    let roomTennantIndex = 0;
    if ( room.type === RoomType.BEDSPACE ) {
      room.bedspaces.forEach( bedspace => {
        bedspace.decks.forEach( deck => {
          const roomTenant: RoomTenant      = {
                                                name: null,
                                                dueRentDate: null,
                                                rent: null,
                                                rentToPay: null,
                                                rentInterestAdded: null,
                                                rentStatus: {value: null},
                                                riceCookerBill: null,
                                                riceCookerBillToPay: null,
                                                riceCookerBillInterestAdded: null,
                                                riceCookerBillStatus: {value: null},
                                                tenantType: TenantType.DECKTENANT,
                                                index: null,
                                              };
          const awayRoomTenant: RoomTenant  = {
                                                name: null,
                                                dueRentDate: null,
                                                rent: null,
                                                rentToPay: null,
                                                rentInterestAdded: null,
                                                rentStatus: {value: null},
                                                riceCookerBillStatus: {value: null},
                                                tenantType: TenantType.AWAYDECKTENANT,
                                                index: null,
                                              };
          if ( deck.tenant !== null ) {
            roomTenant.name                         = `${deck.tenant.firstname} ${deck.tenant.middlename} ${deck.tenant.lastname}`;
            roomTenant.dueRentDate                  = deck.dueRentDate;
            roomTenant.rent                         = deck.monthlyRent;
            roomTenant.rentToPay                    = deck.monthlyRent;
            roomTenant.rentStatus.value             = PaymentStatus.UNPAID;
            roomTenant.rentStatus.balance           = null;
            roomTenant.riceCookerBill               = deck.riceCookerBill;
            roomTenant.riceCookerBillToPay          = deck.riceCookerBill;
            roomTenant.riceCookerBillStatus.value   = PaymentStatus.UNPAID;
            roomTenant.riceCookerBillStatus.balance = null;
            roomTenant.index                        = roomTennantIndex;
            roomTenants.push(roomTenant);
            roomTennantIndex++;
          }
          if (deck.status === DeckStatus.AWAY && deck.away[0].tenant !== null ) {
            // tslint:disable-next-line: max-line-length
            awayRoomTenant.name                       = `${deck.away[0].tenant.firstname} ${deck.away[0].tenant.middlename} ${deck.away[0].tenant.lastname}`;
            awayRoomTenant.dueRentDate                = deck.away[0].dueRentDate;
            awayRoomTenant.rent                       = deck.away[0].rent;
            awayRoomTenant.rentToPay                  = deck.away[0].rent;
            awayRoomTenant.rentStatus.value           = PaymentStatus.UNPAID;
            awayRoomTenant.rentStatus.balance         = null;
            awayRoomTenant.riceCookerBillStatus.value = PaymentStatus.NONE;
            awayRoomTenant.index                      = roomTennantIndex;
            roomTenants.push(awayRoomTenant);
            roomTennantIndex++;
          }
        });
      });
    } else {
      room.roomProperties[0].tenants.forEach( (tenant, arrIndex) => {
        const roomTenant: RoomTenant = {
                                          name: null,
                                          dueRentDate: null,
                                          rent: null,
                                          rentToPay: null,
                                          rentInterestAdded: null,
                                          rentStatus: {value: null},
                                          riceCookerBill: null,
                                          riceCookerBillToPay: null,
                                          riceCookerBillInterestAdded: null,
                                          riceCookerBillStatus: {value: null},
                                          tenantType: TenantType.ROOMTENANT,
                                          index: null,
                                        };
        if ( arrIndex === 0 ) {
          roomTenant.name                         = `${tenant.firstname} ${tenant.middlename} ${tenant.lastname}`;
          roomTenant.dueRentDate                  = room.roomProperties[0].dueRentDate;
          roomTenant.rent                         = room.roomProperties[0].monthlyRent;
          roomTenant.rentToPay                    = room.roomProperties[0].monthlyRent;
          roomTenant.rentStatus.value             = PaymentStatus.UNPAID;
          roomTenant.rentStatus.balance           = null;
          roomTenant.riceCookerBill               = room.roomProperties[0].riceCookerBill;
          roomTenant.riceCookerBillToPay          = room.roomProperties[0].riceCookerBill;
          roomTenant.riceCookerBillStatus.value   = PaymentStatus.UNPAID;
          roomTenant.riceCookerBillStatus.balance = null;
          roomTenant.index                        = roomTennantIndex;
          roomTenants.push(roomTenant);
        } else {
          roomTenant.name               = `${tenant.firstname} ${tenant.middlename} ${tenant.lastname}`;
          roomTenant.dueRentDate        = null;
          roomTenant.rent               = null;
          roomTenant.index              = roomTennantIndex;
          roomTenants.push(roomTenant);
        }
        roomTennantIndex++;
      });
    }
    return roomTenants;
}
