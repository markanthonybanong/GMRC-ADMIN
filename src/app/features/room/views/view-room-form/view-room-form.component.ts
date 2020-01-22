import { Component, OnInit } from '@angular/core';
import { RoomFormStore } from '../../services/room-form/room-form.store';
import { RoomFormEndpoint } from '../../services/room-form/room-form.endpoint';
import { DataRoomService } from '@gmrc-admin/shared/services';
@Component({
  selector: 'app-view-room-form',
  templateUrl: './view-room-form.component.html',
  styleUrls: ['./view-room-form.component.scss'],
  providers: [RoomFormStore, RoomFormEndpoint]
})
export class ViewRoomFormComponent implements OnInit {

  constructor(
    private store: RoomFormStore,
    private dataRoomService: DataRoomService
  ) { }

  ngOnInit() {
    this.dataRoomService.init();
    this.store.init();
  }

}
