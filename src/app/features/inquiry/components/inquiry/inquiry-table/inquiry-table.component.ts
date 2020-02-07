import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent  } from '@angular/material';
import { InquiryStoreState } from '../../../services/inquiry/inquiry/inquiry.store.state';

@Component({
  selector: 'app-inquiry-table',
  templateUrl: './inquiry-table.component.html',
  styleUrls: ['./inquiry-table.component.scss']
})
export class InquiryTableComponent {
  @Input() state: InquiryStoreState;
  @Input() displayedColumns: Array<string>;
  @Input() pageSizeOptions: Array<number>;
  @Output() inquiryTableOnUpdate: EventEmitter<string> = new EventEmitter<string>();
  @Output() inquiryTableOnDelete: EventEmitter<object> = new EventEmitter<object>();
  constructor() { }

  onUpdateInquiry(objectId: string): void {
    this.inquiryTableOnUpdate.emit(objectId);
  }
  onDeleteInquiry(tenantObjectId: string, tenantName: string): void {
    this.inquiryTableOnDelete.emit({
      objectId: tenantObjectId,
      name: tenantName
    });
  }
}
