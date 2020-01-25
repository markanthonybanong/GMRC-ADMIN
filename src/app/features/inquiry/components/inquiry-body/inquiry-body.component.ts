import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InquiryStoreState } from '../../services/inquiry/inquiry.store.state';
import { RequestResponse } from '@gmrc-admin/shared/enums';
import { PageEvent  } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-inquiry-body',
  templateUrl: './inquiry-body.component.html',
  styleUrls: ['./inquiry-body.component.scss']
})
export class InquiryBodyComponent{
  @Input() state$: Observable<InquiryStoreState>;
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
