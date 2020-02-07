import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { TransientPrivateRoomStoreState } from '../../../services/transient-private-room/transient-private-room/transient-private-room.store.state';
import { RequestResponse } from '@gmrc-admin/shared/enums';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-container-transient-private-room',
  templateUrl: './container-transient-private-room.component.html',
  styleUrls: ['./container-transient-private-room.component.scss']
})
export class ContainerTransientPrivateRoomComponent implements OnInit {
  @Input() state$: Observable<TransientPrivateRoomStoreState>;
  @Input() requestResponse: RequestResponse;
  @Input() displayedColumns: Array<string>;
  @Input() pageSizeOptions: Array<string>;
  @Output() containerTranPriRoomOnSearch: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerTranPriRoomOnDisplayAllRooms: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerTranPriRoomOnRoomUpdate: EventEmitter<string> = new EventEmitter<string>();
  @Output() containerTranPriRoomOnPaginatorUpdate: EventEmitter<PageEvent> = new  EventEmitter<PageEvent>();
  constructor() { }

  ngOnInit() {
  }
  onSearch(): void {
    this.containerTranPriRoomOnSearch.emit();
  }
  onDisplayAllRooms(): void {
    this.containerTranPriRoomOnDisplayAllRooms.emit();
  }
  onRoomUpdate(roomObjId: string): void {
    this.containerTranPriRoomOnRoomUpdate.emit(roomObjId);
  }
  onPaginatorUpdate($event: PageEvent): void {
    this.containerTranPriRoomOnPaginatorUpdate.emit($event);
  }

}
