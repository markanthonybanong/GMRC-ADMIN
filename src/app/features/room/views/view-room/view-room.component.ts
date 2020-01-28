import { Component, OnInit } from '@angular/core';
import { RoomStore } from '../../services/room/room.store';
import { RoomEndpoint } from '../../services/room/room.endpoint';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.scss'],
  providers: [RoomStore, RoomEndpoint]
})
export class ViewRoomComponent implements OnInit {

  constructor(
    private store: RoomStore
  ) { }

  ngOnInit() {
  }


}
