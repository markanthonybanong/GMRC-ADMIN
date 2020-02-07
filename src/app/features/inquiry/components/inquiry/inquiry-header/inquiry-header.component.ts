import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inquiry-header',
  templateUrl: './inquiry-header.component.html',
  styleUrls: ['./inquiry-header.component.scss']
})
export class InquiryHeaderComponent implements OnInit {
  @Output() inquiryHeaderOnAdd: EventEmitter<null> = new EventEmitter<null>();
  @Output() inquiryHeaderOnSearch: EventEmitter<null> = new EventEmitter<null>();
  @Output() inquiryHeaderOnDisplayAll: EventEmitter<null> = new EventEmitter<null>();
  constructor(
  ) { }

  ngOnInit() {
  }
  onAddInquiry(): void {
    this.inquiryHeaderOnAdd.emit();
  }
  onSearch(): void {
    this.inquiryHeaderOnSearch.emit();
  }
  onDisplayAllInquiry(): void {
    this.inquiryHeaderOnDisplayAll.emit();
  }


}
