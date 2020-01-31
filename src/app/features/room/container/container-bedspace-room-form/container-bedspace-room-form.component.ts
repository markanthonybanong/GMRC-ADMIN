import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BedspaceRoomFormStoreState } from '../../services/bedspace-room-form/bedspace-room-form.store.state';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Tenant } from 'src/app/features/tenant/types/tenant';

@Component({
  selector: 'app-container-bedspace-room-form',
  templateUrl: './container-bedspace-room-form.component.html',
  styleUrls: ['./container-bedspace-room-form.component.scss']
})
export class ContainerBedspaceRoomFormComponent implements OnInit {
  @Input() state$: Observable<BedspaceRoomFormStoreState>;
  @Input() form: FormGroup;
  @Input() requestResponse: object;
  @Input() roomNumbers: Array<number>;
  @Input() floorNumbers: Array<number>;
  @Input() airconStatuses: Array<string>;
  @Input() bedForm: FormGroup;
  @Input() tenants: Array<Tenant>;
  @Input() deckStatuses: Array<string>;
  @Input() awayDeckStatuses: Array<string>;
  @Input() bedsFormArrayLength: number;
  @Output() roomOnBack: EventEmitter<null> = new EventEmitter<null>();
  @Output() roomOnSubmit: EventEmitter<null> = new EventEmitter<null>();
  @Output() roomOnAddBed: EventEmitter<null> = new EventEmitter<null>();
  @Output() bedFormOnSearchTenant: EventEmitter<string> = new EventEmitter<string>();
  @Output() formOnDeckStatusChange: EventEmitter<object> = new EventEmitter<object>();
  @Output() bedFormOnTenantClick: EventEmitter<object> = new EventEmitter<object>();
  @Output() bedFormOnSubmit: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }
  onBack(): void {
    this.roomOnBack.emit();
  }
  onSubmit(): void {
    this.roomOnSubmit.emit();
  }
  onAddBed(): void {
    this.roomOnAddBed.emit();
  }
  onSearchTenant(tenant: string): void {
    this.bedFormOnSearchTenant.emit(tenant);
  }
  onDeckStatusChange(deck: object): void {
    this.formOnDeckStatusChange.emit(deck);
  }
  onBedFormOnSubmit(bedIndex: number): void {
    this.bedFormOnSubmit.emit(bedIndex);
  }
  onTenantClick(tenant: object): void {
    this.bedFormOnTenantClick.emit(tenant);
  }

}
