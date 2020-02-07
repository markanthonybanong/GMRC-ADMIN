import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { TenantFormStore } from '../../../services/tenant/tenant-form/tenant-form.store';
import { TENANT_CONFIG } from '../../../tenant.config';
import { DataStoreService, DataTenantService, DataRoomService } from '@gmrc-admin/shared/services';
import { TenantFormEndpoint } from '../../../services/tenant/tenant-form/tenant-form.endpoint';

@Component({
  selector: 'app-view-tenant-form',
  templateUrl: './view-tenant-form.component.html',
  styleUrls: ['./view-tenant-form.component.scss'],
  providers: [TenantFormStore, TenantFormEndpoint]
})
export class ViewTenantFormComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private store: TenantFormStore,
    private dataStoreService: DataStoreService,
    private dataTenantService: DataTenantService,
    private dataRoomService: DataRoomService
  ) { }

  ngOnInit() {
    this.subscribeToRouteParamater();
    this.dataRoomService.setRooms();
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
              type: TENANT_CONFIG.filter.type.TENANTBYOBJECTID,
              tenantObjectId: params.get('id')
            }
          }
        });
      })
    )
    .subscribe();
  }

}
