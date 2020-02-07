import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tenant-header',
  templateUrl: './tenant-header.component.html',
  styleUrls: ['./tenant-header.component.scss']
})
export class TenantHeaderComponent implements OnInit {
  @Output() tenantHeaderOnSearch: EventEmitter<null> = new EventEmitter<null>();
  @Output() tenantHeaderOnDisplayAllTenants: EventEmitter<null> = new EventEmitter<null>();
  @Output() tenantHeaderOnAddTenant: EventEmitter<null> = new EventEmitter<null>();
  constructor() { }

  ngOnInit() {
  }

  onSearch(): void {
    this.tenantHeaderOnSearch.emit();
  }
  onDisplayAllTenants(): void {
    this.tenantHeaderOnDisplayAllTenants.emit();
  }
  onAddTenant(): void {
    this.tenantHeaderOnAddTenant.emit();
  }
}
