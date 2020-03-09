import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UnsettleBillFormStoreState } from '../../../services/unsettle-bill/unsettle-bill-form/unsettle-bill-form.store.state';
import { Tenant } from 'src/app/features/tenant/types/tenant/tenant';

@Component({
  selector: 'app-unsettle-bill-form',
  templateUrl: './unsettle-bill-form.component.html',
  styleUrls: ['./unsettle-bill-form.component.scss']
})
export class UnsettleBillFormComponent implements OnInit {
  @Input() unsettleBillForm: FormGroup;
  @Input() state: UnsettleBillFormStoreState;
  @Input() roomNumbers: Array<number>;
  @Input() roomTypes: Array<string>;
  @Input() tenants: Array<Tenant>;
  @Output() unsettleBillFormOnSetTenantOBjectId: EventEmitter<object> = new EventEmitter<object>();
  @Output() unsettleBillFormOnAddTenant: EventEmitter<null> = new EventEmitter<null>();
  @Output() unsettleBillFormOnBack: EventEmitter<null> = new EventEmitter<null>();
  @Output() unsettleBillFormOnSubmit: EventEmitter<null> = new EventEmitter<null>();
  @Output() unsettleBillFormOnRemoveTenant: EventEmitter<number> = new EventEmitter<number>();
  @Output() unsettleBillFormOnSearchTenant: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  onSetTenantObjectId(tenantObjectId: string, tenantIndex: number): void {
    this.unsettleBillFormOnSetTenantOBjectId.emit({
      tenantObjectId: tenantObjectId,
      tenantIndex: tenantIndex
    });
  }
  onAddTenant(): void {
    this.unsettleBillFormOnAddTenant.emit();
  }
  onBack(): void {
    this.unsettleBillFormOnBack.emit();
  }
  onSubmit(): void {
    this.unsettleBillFormOnSubmit.emit();
  }
  onRemoveTenant(tenantIndex: number): void {
    this.unsettleBillFormOnRemoveTenant.emit(tenantIndex);
  }
  onSearchTenant(tenantName: string): void {
    this.unsettleBillFormOnSearchTenant.emit(tenantName);
  }
}
