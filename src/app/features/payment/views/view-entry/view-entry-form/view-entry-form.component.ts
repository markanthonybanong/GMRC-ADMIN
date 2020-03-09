import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntryFormStore } from '../../../services/entry/entry-form/entry-form.store';
import { filter, tap } from 'rxjs/operators';
import { PAYMENT_CONFIG } from '../../../payment.config';
import { DataStoreService, DataRoomService, DataTenantService, DataPaymentService } from '@gmrc-admin/shared/services';
import { EntryFormEndpoint } from '../../../services/entry/entry-form/entry-form.endpoint';

@Component({
  selector: 'app-view-entry-form',
  templateUrl: './view-entry-form.component.html',
  styleUrls: ['./view-entry-form.component.scss'],

  providers: [EntryFormStore, EntryFormEndpoint]
})
export class ViewEntryFormComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private store: EntryFormStore,
    private dataStoreService: DataStoreService,
    private dataRoomService: DataRoomService,
    private dataTenantService: DataTenantService,
    private dataPaymentService: DataPaymentService,
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
              type: PAYMENT_CONFIG.filter.type.ENTRYBYOBJECTID,
              entryObjectId: params.get('id')
            }
          }
        });
      })
    )
    .subscribe();
  }

}
