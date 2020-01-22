import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SearchTransientPrivateRoomComponent } from '../../../modals/search-transient-private-room/search-transient-private-room.component';
import { ROOM_CONFIG } from '../../../room.config';


@Component({
  selector: 'app-transient-private-room-header',
  templateUrl: './transient-private-room-header.component.html',
  styleUrls: ['./transient-private-room-header.component.scss']
})
export class TransientPrivateRoomHeaderComponent implements OnInit {
  @Output() roomSearch: EventEmitter<object> = new EventEmitter<object>();
  @Output() roomDisplayAllRooms: EventEmitter<null> = new EventEmitter<null>();
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  onSearch(): void {
    const dialogRef = this.dialog.open(
      SearchTransientPrivateRoomComponent, {
        data: {
          title: ROOM_CONFIG.actions.searchTransientPrivateRoom
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.roomSearch.emit(result);
      }
    });
  }
  onDisplayAllRooms(): void {
    this.roomDisplayAllRooms.emit();
  }
}

