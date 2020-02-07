import { Component, OnInit  } from '@angular/core';
import { BedspaceRoomStore } from '../../../services/bedspace-room/bedspace-room/bedspace-room.store';
import { BedspaceRoomEndpoint } from '../../../services/bedspace-room/bedspace-room/bedspace-room.endpoint';
import { DataStoreService, DataRoomService } from '@gmrc-admin/shared/services';

@Component({
  selector: 'app-view-bedspace-room',
  templateUrl: './view-bedspace-room.component.html',
  styleUrls: ['./view-bedspace-room.component.scss'],
  providers: [BedspaceRoomStore, BedspaceRoomEndpoint]
})
export class ViewBedspaceRoomComponent implements OnInit {

  constructor(
    private store: BedspaceRoomStore,
    private dataStoreService: DataStoreService,
    private dataRoomService: DataRoomService,
  ) { }

  ngOnInit() {
    this.store.init();
  }

}
