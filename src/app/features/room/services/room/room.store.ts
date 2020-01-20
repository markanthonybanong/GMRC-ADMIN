import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable()
export class RoomStore {
  public roomTableName = 'Private/Transient Rooms';
  constructor(
    private router: Router
  ) {}

  onPrivateTransientRooms(): void {
    this.roomTableName = 'Private/Transient Rooms';
    this.router.navigate(['/room/private-transient']);
  }
  onBedspaceRooms(): void {
    this.roomTableName = 'Bedspace Rooms';
    this.router.navigate(['/room/bedspace']);
  }
  onSemiPrivateRooms(): void {
    this.roomTableName = 'Semi Private Rooms';
    this.router.navigate(['/room/semi-private']);
  }
  onUnsettleBill(): void {
    this.roomTableName = 'Unsettle Bills';
    this.router.navigate(['/room/unsettle-bill']);
  }
  onAddRoom(): void {
    this.router.navigate(['/room/add']);
  }
}
