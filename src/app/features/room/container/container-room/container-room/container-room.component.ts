import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-container-room',
  templateUrl: './container-room.component.html',
  styleUrls: ['./container-room.component.scss']
})
export class ContainerRoomComponent implements OnInit {
  @Input() roomTableName: string;
  @Output () containerRoomOnPrivateTransientRooms: EventEmitter<null> = new EventEmitter<null>();
  @Output () containerRoomOnBedspaceRooms: EventEmitter<null> = new EventEmitter<null>();
  @Output () containerRoomOnSemiPrivateRooms: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerRoomOnAddRoom: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerRoomOnSetTableName: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  onPrivateTransientRooms(): void {
    this.containerRoomOnPrivateTransientRooms.emit();
  }
  onBedspaceRooms(): void {
    this.containerRoomOnBedspaceRooms.emit();
  }
  onSemiPrivateRooms(): void {
    this.containerRoomOnSemiPrivateRooms.emit();
  }
  onAddRoom(): void {
    this.containerRoomOnAddRoom.emit();
  }
  onSetTableName($event: any): void {
    this.containerRoomOnSetTableName.emit($event);
  }

}
