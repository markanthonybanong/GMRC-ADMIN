import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnsettleBillFormStore } from '../../../services/unsettle-bill/unsettle-bill-form/unsettle-bill-form.store';
import { UnsettleBillFormEndpoint } from '../../../services/unsettle-bill/unsettle-bill-form/unsettle-bill-form.endpoint';
import { filter, tap } from 'rxjs/operators';
import { PAYMENT_CONFIG } from '../../../payment.config';
import { DataStoreService, DataRoomService, DataTenantService } from '@gmrc-admin/shared/services';

@Component({
  selector: 'app-view-unsettle-bill-form',
  templateUrl: './view-unsettle-bill-form.component.html',
  styleUrls: ['./view-unsettle-bill-form.component.scss'],
  providers: [UnsettleBillFormStore, UnsettleBillFormEndpoint],
})
export class ViewUnsettleBillFormComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private store: UnsettleBillFormStore,
    private dataStoreService: DataStoreService,
    private dataRoomService: DataRoomService,
    private dataTenantService: DataTenantService
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
              type: PAYMENT_CONFIG.filter.type.UNSETTLEBILLBYOBJECTID,
              unsettleBillObjectId: params.get('id')
            }
          }
        });
      })
    )
    .subscribe();
  }

}
