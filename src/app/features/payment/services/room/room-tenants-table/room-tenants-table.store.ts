import { DataRoomPaymentService } from '@gmrc-admin/shared/services';
import { RoomTenantsTableStoreState } from './room-tenants-table.store.state';
import { Store } from 'rxjs-observable-store';
 
import { Injectable, Input, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material';
import { setRoomTenantsTablePagination } from '../../../helpers/roomPayment/roomPaymentForm/set-room-tenants-table-pagination';
import { RoomFormStore } from 'src/app/features/room/services/room/room-form/room-form.store';
import { RoomFormStoreState } from 'src/app/features/room/services/room/room-form/room-form.store.state';

@Injectable()
export class RoomTenantsTableStore   {
    
    constructor(
        private dataRoomPaymentService: DataRoomPaymentService,
    ) {
       
    }
    init(): void {
       
    }
  
}
