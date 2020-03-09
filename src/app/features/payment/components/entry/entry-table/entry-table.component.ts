import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntryStoreState } from '../../../services/entry/entry/entry.store.state';

@Component({
  selector: 'app-entry-table',
  templateUrl: './entry-table.component.html',
  styleUrls: ['./entry-table.component.scss']
})
export class EntryTableComponent implements OnInit {
  @Input() displayColumns: Array<string>;
  @Input() state: EntryStoreState;
  @Output() entryTableOnUpdate: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  onEntryUpdate(entryObjId: string): void {
    this.entryTableOnUpdate.emit(entryObjId);
  }

}
