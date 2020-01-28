import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BedspaceRoomStore } from '../../services/bedspace-room/bedspace-room.store';
import { BedspaceRoomEndpoint } from '../../services/bedspace-room/bedspace-room.endpoint';
import { DataStoreService } from '@gmrc-admin/shared/services';

@Component({
  selector: 'app-view-bedspace-room',
  templateUrl: './view-bedspace-room.component.html',
  styleUrls: ['./view-bedspace-room.component.scss'],
  providers: [BedspaceRoomStore, BedspaceRoomEndpoint]
})
export class ViewBedspaceRoomComponent implements OnInit {
  @Output() roomHeaderName: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private store: BedspaceRoomStore,
    private dataStoreService: DataStoreService
  ) { }

  ngOnInit() {
    this.roomHeaderName.emit('xxxxx');
    this.store.init();
  }

}
