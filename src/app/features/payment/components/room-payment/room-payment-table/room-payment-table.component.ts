import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoomStoreState } from '../../../services/room/room/room.store.state';

@Component({
  selector: 'app-room-payment-table',
  templateUrl: './room-payment-table.component.html',
  styleUrls: ['./room-payment-table.component.scss']
})
export class RoomPaymentTableComponent implements OnInit {
  @Input() state: RoomStoreState;
  @Input() displayColumns: Array<string>;
  @Output() roomPaymentTableOnUpdateRoomPayment: EventEmitter<string> = new EventEmitter<string>(); 
  constructor() { }

  ngOnInit() {
  }
  onUpdateRoomPayment(roomPaymentObjId: string): void {
    this.roomPaymentTableOnUpdateRoomPayment.emit(roomPaymentObjId);
  }
}
