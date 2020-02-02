import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Tenant } from 'src/app/features/tenant/types/tenant';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-bedspace-bed-form',
  templateUrl: './bedspace-bed-form.component.html',
  styleUrls: ['./bedspace-bed-form.component.scss']
})
export class BedspaceBedFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() tenants: Array<Tenant>;
  @Input() inProgress: boolean;
  @Input() deckStatuses: Array<string>;
  @Input() awayDeckStatuses: Array<string>;
  @Input() bedsFormArrayLength: number;
  @Output() formOnSearchTenant: EventEmitter<string> = new EventEmitter<string>();
  @Output() formOnDeckStatusChange: EventEmitter<object> = new EventEmitter<object>();
  @Output() formOnTenantClick: EventEmitter<object> = new EventEmitter<object>();
  @Output() formUpdate: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }
  onSearchTenant(tenant: string): void {
    this.formOnSearchTenant.emit(tenant);
  }
  onTenantClick(tenant: object): void {
    this.formOnTenantClick.emit(tenant);
  }
  onDeckStatusChange(bedIndex: number, deckIndex: number, $event: MatSelectChange): void {
    this.formOnDeckStatusChange.emit({
      bedIndex,
      deckIndex,
      deckStatus: $event.value
    });
  }
  onUpdate(bedIndex: number): void {
    this.formUpdate.emit(bedIndex);
  }

}
