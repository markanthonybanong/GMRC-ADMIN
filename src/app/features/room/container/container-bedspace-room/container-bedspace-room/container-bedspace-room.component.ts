import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BedspaceRoomStoreState } from '../../../services/bedspace-room/bedspace-room/bedspace-room.store.state';
import { RequestResponse } from '@gmrc-admin/shared/enums';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-container-bedspace-room',
  templateUrl: './container-bedspace-room.component.html',
  styleUrls: ['./container-bedspace-room.component.scss']
})
export class ContainerBedspaceRoomComponent implements OnInit {
  @Input() state$: Observable<BedspaceRoomStoreState>;
  @Input() requestResponse: RequestResponse;
  @Input() displayedColumns: Array<string>;
  @Input() pageSizeOptions: Array<string>;
  @Output() containerBedspaceRoomOnSearch: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerBedspaceRoomOnDisplayAllRooms: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerBedspaceRoomOnRoomUpdate: EventEmitter<string> = new EventEmitter<string>();
  @Output() containerBedspaceRoomOnPaginatorUpdate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  constructor() { }

  ngOnInit() {
  }
  onSearch(): void {
    this.containerBedspaceRoomOnSearch.emit();
   }
   onDisplayAllRooms(): void {
     this.containerBedspaceRoomOnDisplayAllRooms.emit();
   }
   onRoomUpdate(roomObjId: string): void {
    this.containerBedspaceRoomOnRoomUpdate.emit(roomObjId);
   }
   onPaginatorUpdate($event: PageEvent): void {
    this.containerBedspaceRoomOnPaginatorUpdate.emit($event);
   }
}
