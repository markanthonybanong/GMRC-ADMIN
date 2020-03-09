import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestResponse } from '@gmrc-admin/shared/enums';
import { UnsettleBillStoreState } from '../../../services/unsettle-bill/unsettle-bill/unsettle-bill.store.state';
import { PageEvent } from '@angular/material';


@Component({
  selector: 'app-container-unsettle-bill',
  templateUrl: './container-unsettle-bill.component.html',
  styleUrls: ['./container-unsettle-bill.component.scss']
})
export class ContainerUnsettleBillComponent implements OnInit {
  @Input() state$: Observable<UnsettleBillStoreState>;
  @Input() requestResponse: RequestResponse;
  @Input() unSettleBill: object;
  @Input() pageSizeOptions: Array<number>;
  @Input() displayColumns: Array<string>;
  @Output() containerUnsettleBillOnSearch: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerUnsettleBillOnDisplayAllUnsettleBills: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerUnsettleBillOnAddUnsettleBill: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerUnsettleBillOnUpdateUnsettleBill: EventEmitter<string> = new EventEmitter<string>();
  @Output() containerUnsettleBillOnDeleteUnsettleBill: EventEmitter<string> = new EventEmitter<string>();
  @Output() containerUnsettleBillOnPaginatorUpdate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  constructor() { }

  ngOnInit() {
  }
  onSearch(): void {
    this.containerUnsettleBillOnSearch.emit();
  }
  onDisplayAllUnsettleBills(): void {
    this.containerUnsettleBillOnDisplayAllUnsettleBills.emit();
  }
  onAddUnsettleBill(): void {
    this.containerUnsettleBillOnAddUnsettleBill.emit();
  }
  onUpdteUnsettleBill(tenantObj: string): void {
    this.containerUnsettleBillOnUpdateUnsettleBill.emit(tenantObj);
  }
  onDeleteUnsettleBill(tenantObj: string): void {
    this.containerUnsettleBillOnDeleteUnsettleBill.emit(tenantObj);
  }
  onPaginatorUpdate($event: PageEvent): void {
    this.containerUnsettleBillOnPaginatorUpdate.emit($event);
  }
}
