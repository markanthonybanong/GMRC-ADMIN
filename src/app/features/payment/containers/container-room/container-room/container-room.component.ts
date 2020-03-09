import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RoomStoreState } from '../../../services/room/room/room.store.state';
import { Observable } from 'rxjs';
import { RequestResponse } from '@gmrc-admin/shared/enums';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-container-room',
  templateUrl: './container-room.component.html',
  styleUrls: ['./container-room.component.scss']
})
export class ContainerRoomComponent implements OnInit {
  @Input() state$: Observable<RoomStoreState>
  @Input() requestResponse: RequestResponse;
  @Input() displayColumns: Array<string>;
  @Input() pageSizeOptions: Array<string>;
  @Input() roomPayment:object;
  @Output() containerRoomOnSearch: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerRoomOnDisplayAllRoomPayments: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerRoomOnAddRoomPayment: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerRoomOnUpdateRoomPayment: EventEmitter<string> = new EventEmitter<string>();
  @Output() containerRoomOnPaginatorUpdate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  constructor() { }

  ngOnInit() {
  }
  onSearch(): void {
    this.containerRoomOnSearch.emit();
  }
  onDisplayAllRoomPayments(): void {
    this.containerRoomOnDisplayAllRoomPayments.emit();
  }
  onAddRoomPayment(): void {
    this.containerRoomOnAddRoomPayment.emit();
  }
  onRoomPaymentUpdate(roomPaymentObjId: string): void {
    this.containerRoomOnUpdateRoomPayment.emit(roomPaymentObjId);
  }
  onPaginatorUpdate($event: PageEvent): void{
    this.containerRoomOnPaginatorUpdate.emit($event);
  }
  
}
