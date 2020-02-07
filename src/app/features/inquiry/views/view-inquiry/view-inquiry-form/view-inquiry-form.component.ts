import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, tap} from 'rxjs/operators';
import { DataRoomService, DataTenantService, DataStoreService, DataInquiryService } from '@gmrc-admin/shared/services';
import { INQUIRY_CONFIG } from '../../../inquiry.config';
import { InquiryFormStore } from '../../../services/inquiry/inquiry-form/inquiry-form.store';
import { InquiryFormEndpoint } from '../../../services/inquiry/inquiry-form/inquiry-form.endpoint';

@Component({
  selector: 'app-view-inquiry-form',
  templateUrl: './view-inquiry-form.component.html',
  styleUrls: ['./view-inquiry-form.component.scss'],
  providers: [InquiryFormStore, InquiryFormEndpoint]
})
export class ViewInquiryFormComponent implements OnInit {
  constructor(
    private store: InquiryFormStore,
    private route: ActivatedRoute,
    private dataRoomService: DataRoomService,
    private dataTenantService: DataTenantService,
    private dataStoreService: DataStoreService,
    private dataInquiryService: DataInquiryService
  ) { }

  ngOnInit() {
    this.dataRoomService.setRooms();
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
          update: true,
          pageRequest: {
            ...this.store.state.pageRequest,
            filters: {
              type: INQUIRY_CONFIG.filter.type.INQUIRYBYOBJECTID,
              inquiryObjectId: params.get('id')
            }
          }
        });
      })
    )
    .subscribe();
  }
}
