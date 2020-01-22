import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { TransientPrivateRoomFormStoreState } from '../../services/transient-private-room-form/transient-private-room-form.store.state';
import { FormGroup } from '@angular/forms';
import { Request } from '@gmrc-admin/shared/enums';

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
  @Output() transientPrivateFormAddTenant: EventEmitter<null> = new EventEmitter<null>();
  @Output() transientPrivateFormBack: EventEmitter<null> = new EventEmitter<null>();
  @Output() transienPrivateRoomTenantFormOnSearchTenant: EventEmitter<string> = new EventEmitter<string>();
  public request: object = Request;
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
}
