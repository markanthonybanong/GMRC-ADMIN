import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
@Component({
  selector: 'app-room-header',
  templateUrl: './room-header.component.html',
  styleUrls: ['./room-header.component.scss']
})
export class RoomHeaderComponent implements OnInit {
  @Input() roomTableName: string;
  @Output () roomHeaderOnPrivateTransientRooms: EventEmitter<null> = new EventEmitter<null>();
  @Output () roomHeaderOnBedspaceRooms: EventEmitter<null> = new EventEmitter<null>();
  @Output () roomHeaderOnSemiPrivateRooms: EventEmitter<null> = new EventEmitter<null>();
  @Output() roomHeaderOnAddRoom: EventEmitter<null> = new EventEmitter<null>();
  constructor() { }

  ngOnInit() {
  }
  onPrivateTransientRooms(): void {
    this.roomHeaderOnPrivateTransientRooms.emit();
  }
  onBedspaceRooms(): void {
    this.roomHeaderOnBedspaceRooms.emit();
  }
  onSemiPrivateRooms(): void {
    this.roomHeaderOnSemiPrivateRooms.emit();
  }
  onAddRoom(): void {
    this.roomHeaderOnAddRoom.emit();
  }

}
