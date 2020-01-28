import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SearchTransientPrivateRoomComponent } from '../../modals/search-transient-private-room/search-transient-private-room.component';
import { ROOM_CONFIG } from '../../room.config';


@Component({
  selector: 'app-room-body-header',
  templateUrl: './room-body-header.component.html',
  styleUrls: ['./room-body-header.component.scss']
})
export class RoomBodyHeaderComponent implements OnInit {
  @Output() roomSearch: EventEmitter<null> = new EventEmitter<null>();
  @Output() roomDisplayAllRooms: EventEmitter<null> = new EventEmitter<null>();
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  onSearch(): void {
   this.roomSearch.emit();
  }
  onDisplayAllRooms(): void {
    this.roomDisplayAllRooms.emit();
  }
}

