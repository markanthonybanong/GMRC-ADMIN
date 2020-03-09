import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { EntryFormStoreState } from '../../../services/entry/entry-form/entry-form.store.state';
import { RequestResponse } from '@gmrc-admin/shared/enums';
import { FormGroup } from '@angular/forms';
import { Tenant } from 'src/app/features/tenant/types/tenant/tenant';
import { UnsettleBillFormStoreState } from '../../../services/unsettle-bill/unsettle-bill-form/unsettle-bill-form.store.state';

@Component({
  selector: 'app-container-unsettle-bill-form',
  templateUrl: './container-unsettle-bill-form.component.html',
  styleUrls: ['./container-unsettle-bill-form.component.scss']
})
export class ContainerUnsettleBillFormComponent implements OnInit {
  @Input() state$: Observable<UnsettleBillFormStoreState>;
  @Input() requestResponse: RequestResponse;
  @Input() unsettleBillForm: FormGroup;
  @Input() roomNumbers: Array<number>;
  @Input() roomTypes: Array<string>;
  @Input() tenants: Array<Tenant>;
  @Output() containerUnsettleBillFormOnSetTenantObjectId: EventEmitter<object> = new EventEmitter<object>();
  @Output() containerUnsettleBillFormOnAddTenant: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerUnsettleBillFormOnBack: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerUnsettleBillFormOnSubmit: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerUnsettleBillFormOnRemoveTenant: EventEmitter<number> = new EventEmitter<number>();
  @Output() containerUnsettleBillFormOnSearchTenant: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  onSetTenantObjectId($event: {tenantObjectId: string, tenantIndex: number}): void {
    this.containerUnsettleBillFormOnSetTenantObjectId.emit({
      tenantObjectId: $event.tenantObjectId,
      tenantIndex: $event.tenantIndex
    });
  }
  onAddTenant(): void {
    this.containerUnsettleBillFormOnAddTenant.emit();
  }
  onBack(): void {
    this.containerUnsettleBillFormOnBack.emit();
  }
  onSubmit(): void {
    this.containerUnsettleBillFormOnSubmit.emit();
  }
  onRemoveTenant(tenantIndex: number ){
    this.containerUnsettleBillFormOnRemoveTenant.emit(tenantIndex);
  }
  onSearchTenant(tenantName: string): void {
    this.containerUnsettleBillFormOnSearchTenant.emit(tenantName);
  }

}
