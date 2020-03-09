import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoomTenant } from '../../../types/roomPayment/room-tenant';

@Component({
  selector: 'app-room-tenants-table',
  templateUrl: './room-tenants-table.component.html',
  styleUrls: ['./room-tenants-table.component.scss']
})
export class RoomTenantsTableComponent implements OnInit {
  @Input() displayedColumns: Array<string>;
  @Input() dataSource: Array<RoomTenant>;
  @Input() roomType: string;
  @Output() roomTenantsTableOnUpdateTenantPayment: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }
  onUpdateTenantPayment(tenantIndex: number): void {
    this.roomTenantsTableOnUpdateTenantPayment.emit(tenantIndex);
  }
  
}
