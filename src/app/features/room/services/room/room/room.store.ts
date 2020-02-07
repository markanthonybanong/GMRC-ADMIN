import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable()
export class RoomStore {
  public roomTableName: string;
  constructor(
    private router: Router
  ) {}

  onPrivateTransientRooms(): void {
    this.router.navigate(['/room/private-transient']);
  }
  onBedspaceRooms(): void {
    this.router.navigate(['/room/bedspace']);
  }
  onSemiPrivateRooms(): void {
    this.router.navigate(['/room/semi-private']);
  }
  onUnsettleBill(): void {
    this.router.navigate(['/room/unsettle-bill']);
  }
  onAddRoom(): void {
    this.router.navigate(['/room/add']);
  }
  setTableName($event: any): void {
    this.roomTableName = $event.store.tableName;
  }
}
