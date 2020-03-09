import { DataRoomPaymentService } from '@gmrc-admin/shared/services';
import { Store } from 'rxjs-observable-store';
import { RoomFormStoreState } from '../../../services/room/room-form/room-form.store.state';
import { RoomTenant } from '../../../types/roomPayment/room-tenant';
 

export function setRoomTenantsTablePagination(dataRoomPaymentService: DataRoomPaymentService, store: Store<RoomFormStoreState>): void {
    const start = dataRoomPaymentService.pageSize * dataRoomPaymentService.pageNumber;
    const end   = dataRoomPaymentService.pageSize * (dataRoomPaymentService.pageNumber + 1);
    const roomTenantsDataSource: Array<RoomTenant> = dataRoomPaymentService.roomTenants.slice(start,end);
    store.setState({
        ...store.state,
        roomTenantsDataSource: roomTenantsDataSource,
    });
}
