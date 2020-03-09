import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UnsettleBillStoreState } from '../../../services/unsettle-bill/unsettle-bill/unsettle-bill.store.state';

@Component({
  selector: 'app-un-settle-bill-table',
  templateUrl: './un-settle-bill-table.component.html',
  styleUrls: ['./un-settle-bill-table.component.scss']
})
export class UnSettleBillTableComponent implements OnInit {
  @Input() state: UnsettleBillStoreState;
  @Input() displayColumns: Array<string>;
  @Output() unSettleBillTableOnUpdateUnSettleBill: EventEmitter<string> = new EventEmitter<string>(); 
  @Output() unSettleBillTableOnDeleteUnSettleBill: EventEmitter<string> = new EventEmitter<string>(); 
  constructor() { }

  ngOnInit() {
  }
  onUpdateUnSettleBill(objId: string): void {
    this.unSettleBillTableOnUpdateUnSettleBill.emit(objId);
  }
  onDeleteUnsettleBill(objId: string): void {
    this.unSettleBillTableOnDeleteUnSettleBill.emit(objId);
  }
}
