import { Component, OnInit } from '@angular/core';
import { PenaltyStore } from '../../../services/penalty/penalty/penalty.store';
import { PenaltyEndpoint } from '../../../services/penalty/penalty/penalty.endpoint';
import { DataStoreService, DataPenaltyService } from '@gmrc-admin/shared/services';

@Component({
  selector: 'app-view-penalty',
  templateUrl: './view-penalty.component.html',
  styleUrls: ['./view-penalty.component.scss'],
  providers: [PenaltyStore, PenaltyEndpoint]
})
export class ViewPenaltyComponent implements OnInit {

  constructor(
    private store: PenaltyStore,
    private dataStoreService: DataStoreService,
    private dataPenaltyService: DataPenaltyService
  ) { }

  ngOnInit() {
    this.store.init();
  }

}
