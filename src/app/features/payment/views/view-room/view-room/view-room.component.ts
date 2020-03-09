import { Component, OnInit } from '@angular/core';
import { RoomStore } from '../../../services/room/room/room.store';
import { RoomEndpoint } from '../../../services/room/room/room.endpoint';
import { DataStoreService, DataRoomPaymentService } from '@gmrc-admin/shared/services';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.scss'],
  providers: [RoomStore, RoomEndpoint]
})
export class ViewRoomComponent implements OnInit {

  constructor(
    private store: RoomStore,
    private dataStoreService: DataStoreService,
    private dataRoomPaymentService: DataRoomPaymentService
  ) { }

  ngOnInit() {
    this.store.init();
  }

}
