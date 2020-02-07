import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RequestResponse } from '@gmrc-admin/shared/enums';
import { TenantStoreState } from '../../../services/tenant/tenant/tenant.store.state';
@Component({
  selector: 'app-tenant-table',
  templateUrl: './tenant-table.component.html',
  styleUrls: ['./tenant-table.component.scss']
})
export class TenantTableComponent implements OnInit {
  @Input() state: TenantStoreState;
  @Input() requestResponse: RequestResponse;
  @Input() displayedColumns: Array<string>;
  @Output() tenantTableUpdateTenant: EventEmitter<string> =  new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }
  onUpdateTenant(tenantObjId: string): void {
    this.tenantTableUpdateTenant.emit(tenantObjId);
  }

}
