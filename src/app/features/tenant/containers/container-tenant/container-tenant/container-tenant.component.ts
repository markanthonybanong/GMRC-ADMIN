import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TenantStoreState } from '../../../services/tenant/tenant/tenant.store.state';
import { RequestResponse } from '@gmrc-admin/shared/enums';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-container-tenant',
  templateUrl: './container-tenant.component.html',
  styleUrls: ['./container-tenant.component.scss']
})
export class ContainerTenantComponent implements OnInit {
  @Input() state$: Observable<TenantStoreState>;
  @Input() requestResponse: RequestResponse;
  @Input() displayedColumns: Array<string>;
  @Input() pageSizeOptions: Array<number>;
  @Output() containerTenantOnSearch: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerTenantOnDisplayAllTenants: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerTenantOnAddTenant: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerTenantOnUpdateTenant: EventEmitter<string> = new EventEmitter<string>();
  @Output() containerTenantOnPaginatorUpdate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  constructor() { }

  ngOnInit() {
  }
  onSearch(): void {
    this.containerTenantOnSearch.emit();
  }
  onDisplayAllTenants(): void {
    this.containerTenantOnDisplayAllTenants.emit();
  }
  onAddTenant(): void {
    this.containerTenantOnAddTenant.emit();
  }
  onUpdateTenant(tenantObjId: string): void {
    this.containerTenantOnUpdateTenant.emit(tenantObjId);
  }
  onPaginatorUpdate($event: PageEvent): void {
    this.containerTenantOnPaginatorUpdate.emit($event);
  }
}
