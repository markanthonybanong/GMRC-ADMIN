import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoomTenantsTableStore } from '../../../services/room/room-tenants-table/room-tenants-table.store';
import { RoomTenantsTableEndpoint } from '../../../services/room/room-tenants-table/room-tenants-table.endpoint';
import { DataRoomPaymentService, DataStoreService } from '@gmrc-admin/shared/services';
import { MatTableDataSource } from '@angular/material/table/typings/table-data-source';
import { RoomTenant } from '../../../types/roomPayment/room-tenant';
import { RequestState } from '@gmrc-admin/shared/types';
import { Store } from 'rxjs-observable-store';
import { RoomFormStoreState } from 'src/app/features/room/services/room/room-form/room-form.store.state';

@Component({
  selector: 'app-view-room-tenants-table',
  templateUrl: './view-room-tenants-table.component.html',
  styleUrls: ['./view-room-tenants-table.component.scss'],
  providers: [RoomTenantsTableStore, RoomTenantsTableEndpoint],
})
export class ViewRoomTenantsTableComponent implements OnInit {
  @Input() dataSource: Array<RoomTenant>;
  @Input() roomType: string;
  @Input() roomFormStore: Store<RoomFormStoreState>;
  @Output() roomTenantsTableOnUpdateTenantPayment: EventEmitter<number> = new EventEmitter<number>();
  constructor(
    public store: RoomTenantsTableStore,
    public dataRoomPaymentService: DataRoomPaymentService,
    public dataStoreService: DataStoreService
    ) { }

  ngOnInit() {
    
  }
  
  onUpdateTenantPayment(tenantIndex: number): void {
    this.roomTenantsTableOnUpdateTenantPayment.emit(tenantIndex);
  }

}
