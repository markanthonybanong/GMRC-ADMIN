import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { TransientPrivateRoomFormStoreState } from '../../services/transient-private-room-form/transient-private-room-form.store.state';
import { FormGroup } from '@angular/forms';
import { Tenant } from 'src/app/features/tenant/types/tenant';
import { SetTenantObjectId } from '../../types/transient-private-room-tenant-form/set-tenant-object-id';
import { RequestResponse } from 'src/app/shared/enums/request-response';


@Component({
  selector: 'app-container-transient-private-room-form',
  templateUrl: './container-transient-private-room-form.component.html',
  styleUrls: ['./container-transient-private-room-form.component.scss']
})
export class ContainerTransientPrivateRoomFormComponent implements OnInit {
  @Input() state$: Observable<TransientPrivateRoomFormStoreState>;
  @Input() form: FormGroup;
  @Input() airconStatuses: Array<string>;
  @Input() roomStatuses: Array<string>;
  @Input() tenantForm: FormGroup;
  @Input() tenants: Array<Tenant>;
  @Output() transientPrivateFormAddTenant: EventEmitter<null> = new EventEmitter<null>();
  @Output() transientPrivateFormBack: EventEmitter<null> = new EventEmitter<null>();
  @Output() transienPrivateRoomTenantFormOnSearchTenant: EventEmitter<string> = new EventEmitter<string>();
  @Output() transienPrivateRoomTenantFormOnRemoveTenant: EventEmitter<number> = new EventEmitter<number>();
  @Output() transienPrivateRoomTenantFormOnSubmit: EventEmitter<number> = new EventEmitter<number>();
  @Output() transienPrivateRoomTenantFormOnTenantClick: EventEmitter<SetTenantObjectId> = new EventEmitter<SetTenantObjectId>();
  @Output() transientPrivateFormOnSubmit: EventEmitter<null> = new EventEmitter<null>();
  public requestResponse: object = RequestResponse;
  constructor() { }

  ngOnInit() {
  }
  onAddTenant(): void {
    this.transientPrivateFormAddTenant.emit();
  }
  onBack(): void {
    this.transientPrivateFormBack.emit();
  }
  onSearchTenant(name: string): void {
    this.transienPrivateRoomTenantFormOnSearchTenant.emit(name);
  }
  onRemoveTenant($event: number): void {
    this.transienPrivateRoomTenantFormOnRemoveTenant.emit($event);
  }
  tenantFormOnSubmit(tenantIndex: number): void {
    this.transienPrivateRoomTenantFormOnSubmit.emit(tenantIndex);
  }
  onTenantClick($event: SetTenantObjectId): void {
    this.transienPrivateRoomTenantFormOnTenantClick.emit($event);
  }
  roomFormOnSubmit(): void {
    this.transientPrivateFormOnSubmit.emit();
  }
}
