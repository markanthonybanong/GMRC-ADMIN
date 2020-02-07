import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { PageRequest } from '../../types/page-request';
import { RequestState } from '@gmrc-admin/shared/types';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() pageSizeOptions: Array<number>;
  @Input() length: number;
  @Input() request: RequestState;
  @Output() paginatorOnUpdate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  constructor() { }

  ngOnInit() {
  }
  onPaginatorUpdate($event: PageEvent): void {
    this.paginatorOnUpdate.emit($event);
  }

}
