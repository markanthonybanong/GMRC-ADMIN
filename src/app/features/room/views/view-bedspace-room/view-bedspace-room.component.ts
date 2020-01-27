import { Component, OnInit } from '@angular/core';
import { BedspaceRoomStore } from '../../services/bedspace-room/bedspace-room.store';
import { BedspaceRoomEndpoint } from '../../services/bedspace-room/bedspace-room.endpoint';

@Component({
  selector: 'app-view-bedspace-room',
  templateUrl: './view-bedspace-room.component.html',
  styleUrls: ['./view-bedspace-room.component.scss'],
  providers: [BedspaceRoomStore, BedspaceRoomEndpoint]
})
export class ViewBedspaceRoomComponent implements OnInit {

  constructor(
    private store: BedspaceRoomStore
  ) { }

  ngOnInit() {
    this.store.init();
  }

}
