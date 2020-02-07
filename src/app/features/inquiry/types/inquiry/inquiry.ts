export interface Inquiry {
  name: string;
  roomNumber: string;
  roomType: string;
  bedInfos: Array<{bedNumber: number, deckNumber: number}>;
  willOccupyIn: any;
  willOccupyInWarningMsg?: string;
  phoneNumber: number;
  gender: string;
  howDidYouFindUs: string;
  _id: string;
}
