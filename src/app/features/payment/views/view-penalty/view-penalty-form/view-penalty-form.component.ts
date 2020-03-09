import { Component, OnInit } from '@angular/core';
import { PenaltyFormEndpoint } from '../../../services/penalty/penalty-form/penalty-form.endpoint';
import { PenaltyFormStore } from '../../../services/penalty/penalty-form/penalty-form.store';
import { ActivatedRoute } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { PAYMENT_CONFIG } from '../../../payment.config';
import { DataStoreService, DataRoomService, DataTenantService, DataPenaltyService, DataPaymentService } from '@gmrc-admin/shared/services';

@Component({
  selector: 'app-view-penalty-form',
  templateUrl: './view-penalty-form.component.html',
  styleUrls: ['./view-penalty-form.component.scss'],
  providers: [PenaltyFormStore, PenaltyFormEndpoint]
})
export class ViewPenaltyFormComponent implements OnInit {

  constructor(
    private store: PenaltyFormStore,
    private route: ActivatedRoute,
    private dataStoreService: DataStoreService,
    private dataRoomService: DataRoomService,
    private dataTenantService: DataTenantService,
    private dataPenaltyService: DataPenaltyService,
    private dataPaymentServices: DataPaymentService 
  ) { }

  ngOnInit() {
    this.subscribeToRouteParamater();
    this.store.init();
  }
  private subscribeToRouteParamater(): void {
    this.route.paramMap
    .pipe(
      filter( (params) => params.get('id') !== null),
      tap((params) => {
        this.store.setState({
          ...this.store.state,
          isUpdate: true,
          pageRequest: {
            ...this.store.state.pageRequest,
            filters: {
              type: PAYMENT_CONFIG.filter.type.PENALTYBYOBJECTID,
              penaltyObjectId: params.get('id')
            }
          }
        });
      })
    )
    .subscribe();
  }

}
