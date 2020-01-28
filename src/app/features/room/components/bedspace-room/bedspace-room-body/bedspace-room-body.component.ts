import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BedspaceRoomStoreState } from '../../../services/bedspace-room/bedspace-room.store.state';
import { RequestResponse } from '@gmrc-admin/shared/enums';

@Component({
  selector: 'app-bedspace-room-body',
  templateUrl: './bedspace-room-body.component.html',
  styleUrls: ['./bedspace-room-body.component.scss']
})
export class BedspaceRoomBodyComponent implements OnInit {
  @Input() displayedColumns: Array<string>;
  @Input() state$: Observable<BedspaceRoomStoreState>;
  @Input() request: RequestResponse;
  @Output() roomUpdate: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }
  updateRoom(roomObjectId: string): void {
    this.roomUpdate.emit(roomObjectId);
  }

}
