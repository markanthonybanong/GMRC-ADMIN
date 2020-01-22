import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transient-private-room-tenant-form',
  templateUrl: './transient-private-room-tenant-form.component.html',
  styleUrls: ['./transient-private-room-tenant-form.component.scss']
})
export class TransientPrivateRoomTenantFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Output() transienPrivateRoomTenantFormOnSearchTenant: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  onSearchTenant(name: string): void {
    this.transienPrivateRoomTenantFormOnSearchTenant.emit(name);
  }

}
