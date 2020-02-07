import { Component, OnInit } from '@angular/core';
import { TransientPrivateRoomStore } from '../../../services/transient-private-room/transient-private-room/transient-private-room.store';
import { TransientPrivateRoomEndpoint } from '../../../services/transient-private-room/transient-private-room/transient-private-room.endpoint';
import { DataStoreService, DataRoomService } from '@gmrc-admin/shared/services';

@Component({
  selector: 'app-view-transient-private-room',
  templateUrl: './view-transient-private-room.component.html',
  styleUrls: ['./view-transient-private-room.component.scss'],
  providers: [TransientPrivateRoomStore, TransientPrivateRoomEndpoint]
})
export class ViewTransientPrivateRoomComponent implements OnInit {

  constructor(
    private store: TransientPrivateRoomStore,
    private dataStoreService: DataStoreService,
    private dataRoomService: DataRoomService,
  ) {
    store.init();
   }

  ngOnInit() {
  }

}
