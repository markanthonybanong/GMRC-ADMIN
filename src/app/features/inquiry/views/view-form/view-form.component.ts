import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormStore } from '../../services/form/form.store';
import { FormEndpoint } from '../../services/form/form.endpoint';
import { Request } from '@gmrc-admin/shared/enums';
import { ActivatedRoute } from '@angular/router';
import { filter, tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { INQUIRY_CONFIG } from '../../inquiry.config';
import { DataRoomService, DataTenantService, DataStoreService } from '@gmrc-admin/shared/services';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.scss'],
  providers: [FormStore, FormEndpoint]
})
export class ViewFormComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private store: FormStore,
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
