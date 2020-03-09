import { FormGroup } from '@angular/forms';
import { RoomTenant } from '../../../types/roomPayment/room-tenant';

export function addRoomTenantsToForm(roomPaymentForm: FormGroup, roomTenant: Array<RoomTenant>): void {
    if(roomTenant.length > 0 ) {
        roomPaymentForm.get('roomTenants').setValue(null);
        roomPaymentForm.get('roomTenants').setValue(roomTenant);
    }
}
