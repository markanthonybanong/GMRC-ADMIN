export class Room {
  number: number;
  floor: number;
  type: string;
  aircon: string;
  transientPrivateRoomProperties: [{
    status: string,
    dueRentDate: number,
    monthlyRent: number,
    riceCookerBill: number,
    tenants: Array<any>;
  }];
  bedspaces: any[];
  tenantsArr: any[];
  _id: string;
}
