import { Component, OnInit } from '@angular/core';
import { UnsettleBillStore } from '../../../services/unsettle-bill/unsettle-bill/unsettle-bill.store';
import { UnsettleBillEndpoint } from '../../../services/unsettle-bill/unsettle-bill/unsettle-bill.endpoint';
import { DataStoreService, DataUnsettleBillService } from '@gmrc-admin/shared/services';

@Component({
  selector: 'app-view-unsettle-bill',
  templateUrl: './view-unsettle-bill.component.html',
  styleUrls: ['./view-unsettle-bill.component.scss'],
  providers: [UnsettleBillStore, UnsettleBillEndpoint]
})
export class ViewUnsettleBillComponent implements OnInit {

  constructor(
    private store: UnsettleBillStore,
    private dataStoreService: DataStoreService,
    private dataUnsettleBillService: DataUnsettleBillService,
  ) { }

  ngOnInit() {
    this.store.init();
  }

}
