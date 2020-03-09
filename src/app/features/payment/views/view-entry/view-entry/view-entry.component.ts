import { Component, OnInit } from '@angular/core';
import { EntryStore } from '../../../services/entry/entry/entry.store';
import { EntryEndpoint } from '../../../services/entry/entry/entry.endpoint';
import { DataPaymentService, DataStoreService, DataEntryService } from '@gmrc-admin/shared/services';

@Component({
  selector: 'app-view-entry',
  templateUrl: './view-entry.component.html',
  styleUrls: ['./view-entry.component.scss'],
  providers: [EntryStore, EntryEndpoint]
})
export class ViewEntryComponent implements OnInit {

  constructor(
    private store: EntryStore,
    private dataPaymentService: DataPaymentService,
    private dataStoreService: DataStoreService,
    private dataEntryService: DataEntryService
  ) { }

  ngOnInit() {
    this.store.init();
  }

}
