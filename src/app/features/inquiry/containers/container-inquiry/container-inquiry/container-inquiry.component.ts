import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { InquiryStoreState } from '../../../services/inquiry/inquiry/inquiry.store.state';
import { RequestResponse } from '@gmrc-admin/shared/enums';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-container-inquiry',
  templateUrl: './container-inquiry.component.html',
  styleUrls: ['./container-inquiry.component.scss']
})
export class ContainerInquiryComponent implements OnInit {
  @Input() state$: Observable<InquiryStoreState>;
  @Input() displayedColumns: Array<string>;
  @Input() pageSizeOptions: Array<string>;
  @Input() requestResponse: RequestResponse;
  @Output() containerInquiryOnAdd: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerInquiryOnSearch: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerInquiryOnDisplayAllInquiry: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerInquiryOnPaginatorUpdate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() containerInquiryOnInquiryUpdate: EventEmitter<string> = new EventEmitter<string>();
  @Output() containerInquiryOnInquiryDelete: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  onAddInquiry(): void {
    this.containerInquiryOnAdd.emit();
  }
  onSearch(): void {
    this.containerInquiryOnSearch.emit();
  }
  onDisplayAllInquiry(): void {
    this.containerInquiryOnDisplayAllInquiry.emit();
  }
  onPaginatorUpdate($event: PageEvent): void {
    this.containerInquiryOnPaginatorUpdate.emit($event);
  }
  onInquiryUpdate(inquiryObjId: string): void {
    this.containerInquiryOnInquiryUpdate.emit(inquiryObjId);
  }
  onInquiryDelete(inquiryObjId: string): void {
    this.containerInquiryOnInquiryDelete.emit(inquiryObjId);
  }
}
