import { Component, OnInit } from '@angular/core';
import { DataStoreService, DataTenantService} from '@gmrc-admin/shared/services';
import { TenantStore } from '../../../services/tenant/tenant/tenant.store';
import { TenantEndpoint } from '../../../services/tenant/tenant/tenant.endpoint';


@Component({
  selector: 'app-view-tenant',
  templateUrl: './view-tenant.component.html',
  styleUrls: ['./view-tenant.component.scss'],
  providers: [TenantStore, TenantEndpoint]
})
export class ViewTenantComponent implements OnInit {

  constructor(
    private dataStoreService: DataStoreService,
    private store: TenantStore,
    private dataTenantService: DataTenantService
  ) { }

  ngOnInit() {
    this.store.init();
  }

}
