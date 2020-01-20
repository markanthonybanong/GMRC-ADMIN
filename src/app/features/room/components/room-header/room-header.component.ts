import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-room-header',
  templateUrl: './room-header.component.html',
  styleUrls: ['./room-header.component.scss']
})
export class RoomHeaderComponent implements OnInit {
  @Input() roomTableName: string;
  @Output () listPrivateTransientRooms: EventEmitter<null> = new EventEmitter<null>();
  @Output () listBedspaceRooms: EventEmitter<null> = new EventEmitter<null>();
  @Output () listSemiPrivateRooms: EventEmitter<null> = new EventEmitter<null>();
  @Output () listUnsettleBill: EventEmitter<null> = new EventEmitter<null>();
  @Output() listAddRoom: EventEmitter<null> = new EventEmitter<null>();
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  onPrivateTransientRooms(): void {
    this.listPrivateTransientRooms.emit();
  }
  onBedspaceRooms(): void {
    this.listBedspaceRooms.emit();
  }
  onSemiPrivateRooms(): void {
    this.listSemiPrivateRooms.emit();
  }
  onUnsettleBill(): void {
    this.listUnsettleBill.emit();
  }
  onAddRoom(): void {
    this.listAddRoom.emit();
  }

}
