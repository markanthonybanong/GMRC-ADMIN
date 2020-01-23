import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Tenant } from 'src/app/features/tenant/types/tenant';
import { SetTenantObjectId } from '../../../types/transient-private-room-tenant-form/set-tenant-object-id';
@Component({
  selector: 'app-transient-private-room-tenant-form',
  templateUrl: './transient-private-room-tenant-form.component.html',
  styleUrls: ['./transient-private-room-tenant-form.component.scss']
})
export class TransientPrivateRoomTenantFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() tenants: Array<Tenant>;
  @Output() transienPrivateRoomTenantFormOnSearchTenant: EventEmitter<string> = new EventEmitter<string>();
  @Output() transienPrivateRoomTenantFormOnRemoveTenant: EventEmitter<number> = new EventEmitter<number>();
  @Output() transienPrivateRoomTenantFormOnSubmit: EventEmitter<number> = new EventEmitter<number>();
  @Output() transienPrivateRoomTenantFormOnTenantClick: EventEmitter<SetTenantObjectId> = new EventEmitter<SetTenantObjectId>();
  constructor() { }

  ngOnInit() {
  }
  onRemoveTenant(tenantIndex: number): void {
    this.transienPrivateRoomTenantFormOnRemoveTenant.emit(tenantIndex);
  }
  onSearchTenant(name: string): void {
    this.transienPrivateRoomTenantFormOnSearchTenant.emit(name);
  }
  onSubmit(tenantIndex: number): void {
    this.transienPrivateRoomTenantFormOnSubmit.emit(tenantIndex);
  }
  onTenantClick($event: SetTenantObjectId): void {
    this.transienPrivateRoomTenantFormOnTenantClick.emit($event);
  }
}
