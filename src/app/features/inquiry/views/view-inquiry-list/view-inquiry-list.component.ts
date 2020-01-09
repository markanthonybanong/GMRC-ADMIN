import { Component, OnInit } from '@angular/core';
import { InquiryListStore } from '../../services/inquiry-list/inquiry-list.store';
import { InquiryListEndpoint } from '../../services/inquiry-list/inquiry-list.endpoint';

@Component({
  selector: 'app-view-inquiry-list',
  templateUrl: './view-inquiry-list.component.html',
  styleUrls: ['./view-inquiry-list.component.scss'],
  providers: [InquiryListStore, InquiryListEndpoint]
})
export class ViewInquiryListComponent implements OnInit {

  constructor(
    private store: InquiryListStore
  ) {
    this.store.init();
  }

  ngOnInit() {
  }

}
