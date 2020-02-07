import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataInquiryService {

  constructor() { }
  get displayedColumns(): Array<string> {
    return [
      'name',
      'roomType',
      'roomNumber',
      'willOccupyIn',
      'phoneNumber',
      'actions',
    ];
  }
  get knownGMRCThrough(): Array<string> {
    return [
      'Through social platforms',
      'Someone suggested',
      'Flyers',
      'etc'
    ];
  }
}
