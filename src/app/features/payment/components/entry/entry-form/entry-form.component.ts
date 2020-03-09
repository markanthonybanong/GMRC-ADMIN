import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { EntryFormStoreState } from '../../../services/entry/entry-form/entry-form.store.state';
import { Tenant } from 'src/app/features/tenant/types/tenant/tenant';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss'],
})
export class EntryFormComponent implements OnInit {
  @Input() entryForm: FormGroup;
  @Input() state: EntryFormStoreState;
  @Input() roomNumbers: Array<number>;
  @Input() tenants: Array<Tenant>;
  @Input() keyStatuses: Array<string>;
  @Input() paymentStatuses: Array<string>;
  @Output() entryFormOnSearchTenant: EventEmitter<string> = new EventEmitter<string>();
  @Output() entryFormOnSetTenantObjId: EventEmitter<string> = new EventEmitter<string>();
  @Output() entryFormOnOneMonthDepositToggle: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();
  @Output() entryFormOnOneMonthAdvanceToggle: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();
  @Output() entryFormOnAddPartialPayment: EventEmitter<null> = new EventEmitter<null>();
  @Output() entryFormOnBack: EventEmitter<null> = new EventEmitter<null>();
  @Output() entryFormOnSubmit: EventEmitter<null> = new EventEmitter<null>();
  constructor() { }

  ngOnInit() {
  }
  onSearchTenant(tenantName: string): void {
    this.entryFormOnSearchTenant.emit(tenantName);
  }
  onSetTenantObjectId(tenantObjectId: string): void {
    this.entryFormOnSetTenantObjId.emit(tenantObjectId);
  }
  onOneMonthDepositToggle($event:MatSelectChange): void {
    this.entryFormOnOneMonthDepositToggle.emit($event);
  }
  onOneMonthAdvanceToggle($event: MatSelectChange): void {
    this.entryFormOnOneMonthAdvanceToggle.emit($event);
  }
  onAddPartialPayment(): void {
    this.entryFormOnAddPartialPayment.emit();
  }
  onBack(): void {
    this.entryFormOnBack.emit();
  }
  onSubmit(): void {
    this.entryFormOnSubmit.emit();
  }

}
