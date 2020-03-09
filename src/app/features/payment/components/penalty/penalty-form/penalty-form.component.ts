import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PenaltyFormStoreState } from '../../../services/penalty/penalty-form/penalty-form.store.state';
import { Tenant } from 'src/app/features/tenant/types/tenant/tenant';
import { MatSelect } from '@angular/material';


@Component({
  selector: 'app-penalty-form',
  templateUrl: './penalty-form.component.html',
  styleUrls: ['./penalty-form.component.scss']
})
export class PenaltyFormComponent implements OnInit {
  @Input() penaltyForm: FormGroup;
  @Input() state: PenaltyFormStoreState;
  @Input() roomNumbers: Array<number>;
  @Input() tenants: Array<Tenant>;
  @Input() roomViolations: Array<string>;
  @Input() paymentStatuses: Array<string>;
  @Output() penaltyFormOnSubmit: EventEmitter<null> = new EventEmitter<null>();
  @Output() penaltyFormOnBack: EventEmitter<null> = new EventEmitter<null>();
  @Output() penaltyFormOnSearchTenant: EventEmitter<string> = new EventEmitter<string>();
  @Output() penaltyFormOnSetTenantObjectId: EventEmitter<string> = new EventEmitter<string>();
  @Output() penaltyFormOnPaymentStatusSelect: EventEmitter<MatSelect> = new EventEmitter<MatSelect>();
  constructor() { }

  ngOnInit() {
  }
  onSubmit(): void {
    this.penaltyFormOnSubmit.emit();
  }
  onBack(): void {
    this.penaltyFormOnBack.emit();
  }
  onSearchTenant(tenantName: string): void {
    this.penaltyFormOnSearchTenant.emit(tenantName);
  }
  onSetTenantObjectId(tenantObjId: string): void {
    this.penaltyFormOnSetTenantObjectId.emit(tenantObjId);
  }
  onPaymentStatusSelect($event: MatSelect): void {
    this.penaltyFormOnPaymentStatusSelect.emit($event);
  }
}
