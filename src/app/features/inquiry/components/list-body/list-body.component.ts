import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListStoreState } from '../../services/list/list.store.state';
import { PageEvent } from '@angular/material/paginator/typings/public-api';

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
  @Output() paginatorUpdate = new EventEmitter<PageEvent>();
  constructor() { }

  ngOnInit() {
  }
  onPaginatorUpdate($event: PageEvent): void {
    this.paginatorUpdate.emit($event);
  }

}
