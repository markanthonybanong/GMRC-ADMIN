import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TransientPrivateRoomStoreState } from '../../../services/transient-private-room/transient-private-room/transient-private-room.store.state';
import { Observable } from 'rxjs';
import { RequestResponse } from '@gmrc-admin/shared/enums';

@Component({
  selector: 'app-transient-private-room-table',
  templateUrl: './transient-private-room-table.component.html',
  styleUrls: ['./transient-private-room-table.component.scss']
})
export class TransientPrivateRoomTableComponent implements OnInit {
  @Input() displayedColumns: Array<string>;
  @Input() state: TransientPrivateRoomStoreState;
  @Output() tranPriRoomTableOnRoomUpdate: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  onUpdateRoom(roomObjectId: string): void {
    this.tranPriRoomTableOnRoomUpdate.emit(roomObjectId);
  }

}
