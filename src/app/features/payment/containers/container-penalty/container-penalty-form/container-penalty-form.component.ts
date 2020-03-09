import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { PenaltyFormStoreState } from '../../../services/penalty/penalty-form/penalty-form.store.state';
import { RequestResponse } from '@gmrc-admin/shared/enums';
import { FormGroup } from '@angular/forms';
import { Tenant } from 'src/app/features/tenant/types/tenant/tenant';
import { MatSelect } from '@angular/material';

@Component({
  selector: 'app-container-penalty-form',
  templateUrl: './container-penalty-form.component.html',
  styleUrls: ['./container-penalty-form.component.scss']
})
export class ContainerPenaltyFormComponent implements OnInit {
  @Input() state$: Observable<PenaltyFormStoreState>;
  @Input() requestResponse: RequestResponse;
  @Input() penaltyForm: FormGroup;
  @Input() roomNumbers: Array<number>;
  @Input() tenants: Array<Tenant>;
  @Input() roomViolations: Array<string>;
  @Input() paymentStatuses: Array<string>;
  @Output() containerFormOnSearchTenant: EventEmitter<string> = new EventEmitter<string>();
  @Output() containerFormOnSetTenantObjectId: EventEmitter<string> = new EventEmitter<string>();
  @Output() containerFormOnSubmit: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerFormOnBack: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerFormOnPaymentStatusSelect: EventEmitter<MatSelect> = new EventEmitter<MatSelect>();
  constructor() { }

  ngOnInit() {
  }
  onSearchTenant(tenantName: string): void {
    this.containerFormOnSearchTenant.emit(tenantName);
  }
  onSetTenantObjectId(tenantObjId: string): void {
    this.containerFormOnSetTenantObjectId.emit(tenantObjId);
  }
  onSubmit(): void {
    this.containerFormOnSubmit.emit();
  }
  onBack(): void {
    this.containerFormOnBack.emit();
  }
  onPaymentStatusSelect($event: MatSelect): void {
    this.containerFormOnPaymentStatusSelect.emit($event);
  }

}
