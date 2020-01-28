import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { InquiryFormStore } from '../../services/inquiry-form/inquiry-form.store';
import { ActivatedRoute } from '@angular/router';
import { filter, tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { INQUIRY_CONFIG } from '../../inquiry.config';
import { DataRoomService, DataTenantService, DataStoreService } from '@gmrc-admin/shared/services';
import { InquiryFormEndpoint } from '../../services/inquiry-form/inquiry-form.endpoint';

@Component({
  selector: 'app-view-inquiry-form',
  templateUrl: './view-inquiry-form.component.html',
  styleUrls: ['./view-inquiry-form.component.scss'],
  providers: [InquiryFormStore, InquiryFormEndpoint]
})
export class ViewInquiryFormComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: InquiryFormStore,
    private route: ActivatedRoute,
    private dataRoomService: DataRoomService,
    private dataTenantService: DataTenantService,
    private dataStoreService: DataStoreService
  ) { }

  ngOnInit() {
    this.subscribeToRouteParamater();
    this.store.init();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
              type: INQUIRY_CONFIG.filters.types.INQUIRYBYOBJECTID,
              inquiryObjectId: params.get('id')
            }
          }
        });
      }),
      takeUntil(this.destroy$)
    )
    .subscribe();
  }
}
