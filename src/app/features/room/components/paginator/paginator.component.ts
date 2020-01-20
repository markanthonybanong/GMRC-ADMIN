import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() pageSizeOptions: Array<number>;
  @Input () totalCount: number;
  @Output() paginatorUpdate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  constructor() { }

  ngOnInit() {
  }
  onPaginatorUpdate($event: PageEvent): void {
    this.paginatorUpdate.emit($event);
  }

}
