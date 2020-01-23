import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ListStoreState } from '../../services/list/list.store.state';
import { RequestResponse } from '@gmrc-admin/shared/enums';
import { PageEvent  } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-list-body',
  templateUrl: './list-body.component.html',
  styleUrls: ['./list-body.component.scss']
})
export class ListBodyComponent{
  @Input() state$: Observable<ListStoreState>;
  @Input() displayedColumns: Array<string>;
  @Input() pageSizeOptions: Array<number>;
  @Input() request: RequestResponse;
  @Output() listPaginatorUpdate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() listInquiryUpdate: EventEmitter<string> = new EventEmitter<string>();
  @Output() listInquiryDelete: EventEmitter<object> = new EventEmitter<object>();
  constructor() { }

  onPaginatorUpdate($event: PageEvent): void {
    this.listPaginatorUpdate.emit($event);
  }
  onUpdateInquiry(objectId: string): void {
    this.listInquiryUpdate.emit(objectId);
  }
  onDeleteInquiry(tenantObjectId: string, tenantName: string): void {
    this.listInquiryDelete.emit({
      objectId: tenantObjectId,
      name: tenantName
    });
  }
}
