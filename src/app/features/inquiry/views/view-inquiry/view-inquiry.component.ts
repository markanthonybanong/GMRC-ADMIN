import { Component, OnInit} from '@angular/core';
import { InquiryStore } from '../../services/inquiry/inquiry.store';
import { DataStoreService } from '@gmrc-admin/shared/services';
import { InquiryEndpoint } from '../../services/inquiry/inquiry.endpoint';

@Component({
  selector: 'app-view-inquir',
  templateUrl: './view-inquiry.component.html',
  styleUrls: ['./view-inquiry.component.scss'],
  providers: [InquiryStore, InquiryEndpoint]
})
export class ViewInquiryComponent implements OnInit  {

  constructor(
    private store: InquiryStore,
    private dataStoreService: DataStoreService) {
    this.store.init();
  }

  ngOnInit() {
  }

}
