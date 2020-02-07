import { Component, OnInit} from '@angular/core';
import { DataStoreService, DataInquiryService } from '@gmrc-admin/shared/services';
import { InquiryStore } from '../../../services/inquiry/inquiry/inquiry.store';
import { InquiryEndpoint } from '../../../services/inquiry/inquiry/inquiry.endpoint';


@Component({
  selector: 'app-view-inquir',
  templateUrl: './view-inquiry.component.html',
  styleUrls: ['./view-inquiry.component.scss'],
  providers: [InquiryStore, InquiryEndpoint]
})
export class ViewInquiryComponent implements OnInit  {

  constructor(
    private store: InquiryStore,
    private dataInquiryService: DataInquiryService,
    private dataStoreService: DataStoreService) {
    this.store.init();
  }

  ngOnInit() {
  }

}
