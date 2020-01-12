import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListStoreState } from '../../services/list/list.store.state';
import { PageEvent } from '@angular/material/paginator/typings/public-api';
import { Request } from '@gmrc-admin/shared/enums';

@Component({
  selector: 'app-list-body',
  templateUrl: './list-body.component.html',
  styleUrls: ['./list-body.component.scss']
})
export class ListBodyComponent implements OnInit {
  @Input() state$: ListStoreState;
  @Input() displayedColumns: Array<string>;
  @Input() pageSizeOptions: Array<number>;
  @Input() totalCount: number;
  @Input() request: Request;
  @Output() listPaginatorUpdate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() listInquiryUpdate: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  onPaginatorUpdate($event: PageEvent): void {
    this.listPaginatorUpdate.emit($event);
  }
  onUpdateInquiry(objectId: string): void {
    this.listInquiryUpdate.emit(objectId);
  }

}
