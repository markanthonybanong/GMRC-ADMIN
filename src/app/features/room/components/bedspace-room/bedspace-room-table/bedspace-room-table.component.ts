import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BedspaceRoomStoreState } from '../../../services/bedspace-room/bedspace-room/bedspace-room.store.state';
import { RequestResponse } from '@gmrc-admin/shared/enums';

@Component({
  selector: 'app-bedspace-room-table',
  templateUrl: './bedspace-room-table.component.html',
  styleUrls: ['./bedspace-room-table.component.scss']
})
export class BedspaceRoomTableComponent implements OnInit {
  @Input() displayedColumns: Array<string>;
  @Input() state: BedspaceRoomStoreState;
  @Input() request: RequestResponse;
  @Output() bedspaceRoomTableOnRoomUpdate: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }
  updateRoom(roomObjectId: string): void {
    this.bedspaceRoomTableOnRoomUpdate.emit(roomObjectId);
  }

}
