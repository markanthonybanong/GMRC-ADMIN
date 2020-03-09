import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { EntryFormStoreState } from '../../../services/entry/entry-form/entry-form.store.state';
import { RequestResponse } from '@gmrc-admin/shared/enums';
import { FormGroup, FormArray } from '@angular/forms';
import { Tenant } from 'src/app/features/tenant/types/tenant/tenant';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-container-entry-form',
  templateUrl: './container-entry-form.component.html',
  styleUrls: ['./container-entry-form.component.scss']
})
export class ContainerEntryFormComponent implements OnInit {
  @Input() state$: Observable<EntryFormStoreState>;
  @Input() requestResponse: RequestResponse;
  @Input() entryForm: FormGroup;
  @Input() roomNumbers: Array<number>;
  @Input() tenants: Array<Tenant>;
  @Input() keyStatuses: Array<string>;
  @Input() paymentStatuses: Array<string>;
  @Output() containerEntryFormOnSearchTenant: EventEmitter<string> = new EventEmitter<string>();
  @Output() containerEntryFormOnSetTenantObjId: EventEmitter<string> = new EventEmitter<string>();
  @Output() containerEntryFormOnOneMonthDepositToggle: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();
  @Output() containerEntryFormOnOneMonthAdvanceToggle: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();
  @Output() containerEntryFormOnAddPartialPayment: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerEntryFormOnBack: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerEntryFormOnSubmit: EventEmitter<null> = new EventEmitter<null>(); 
  constructor() { }

  ngOnInit() {
  }
  onSearchTenant(tenantName: string): void {
    this.containerEntryFormOnSearchTenant.emit(tenantName);
  }
  onSetTenantObjId(tenantObjId: string): void {
    this.containerEntryFormOnSetTenantObjId.emit(tenantObjId);
  }
  onOneMonthDepositToggle($event:MatSelectChange): void {
    this.containerEntryFormOnOneMonthDepositToggle.emit($event);
  }
  onOneMonthAdvanceToggle($event: MatSelectChange): void {
    this.containerEntryFormOnOneMonthAdvanceToggle.emit($event);
  }
  onAddPartialPayment(): void {
    this.containerEntryFormOnAddPartialPayment.emit();
  }
  onBack(): void {
    this.containerEntryFormOnBack.emit();
  }
  onSubmit(): void {
    this.containerEntryFormOnSubmit.emit();
  }

}
