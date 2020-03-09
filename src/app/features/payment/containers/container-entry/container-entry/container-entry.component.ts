import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EntryStoreState } from '../../../services/entry/entry/entry.store.state';
import { Observable } from 'rxjs';
import { RequestResponse } from '@gmrc-admin/shared/enums';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-container-entry',
  templateUrl: './container-entry.component.html',
  styleUrls: ['./container-entry.component.scss']
})
export class ContainerEntryComponent implements OnInit {
  @Input() state$: Observable<EntryStoreState>;
  @Input() requestResponse: RequestResponse;
  @Input() entry: object;
  @Input() pageSizeOptions: Array<number>;
  @Input() displayColumns: Array<string>;
  @Output() containerEntryOnSearch: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerEntryOnDisplayEntries: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerEntryOnAddEntry: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerEntryOnUpdate: EventEmitter<string> = new EventEmitter<string>();
  @Output() containerEntryOnPaginatorUpdate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  constructor() { }

  ngOnInit() {
  }

  onSearch(): void{
    this.containerEntryOnSearch.emit();
  }
  onDisplayAllEntries(): void {
    this.containerEntryOnDisplayEntries.emit();
  }
  onAddEntry(): void {
    this.containerEntryOnAddEntry.emit()
  }
  onEntryUpdate(entryObjId: string): void {
    this.containerEntryOnUpdate.emit(entryObjId);
  }
  onPaginatorUpdate($event: PageEvent): void {
    this.containerEntryOnPaginatorUpdate.emit($event);
  }
}
