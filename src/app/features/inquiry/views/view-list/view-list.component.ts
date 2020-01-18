import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ListStore } from '../../services/list/list.store';
import { ListEndpoint } from '../../services/list/list.endpoint';
import { DataTableService, DataStoreService } from '@gmrc-admin/shared/services';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss'],
  providers: [ListStore, ListEndpoint]
})
export class ViewListComponent implements OnInit  {

  constructor(
    private store: ListStore,
    private dataTableService: DataTableService,
    private dataStoreService: DataStoreService) {
    this.store.init();
  }

  ngOnInit() {
  }

}
