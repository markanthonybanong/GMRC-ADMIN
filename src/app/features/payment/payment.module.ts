import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRoutingModule } from './payment-routing.module';
import { ViewPaymentComponent } from './views/view-payment/view-payment/view-payment.component';
import { ViewEntryComponent } from './views/view-entry/view-entry/view-entry.component';
import { ViewRoomComponent } from './views/view-room/view-room/view-room.component';
import { ViewPenaltyComponent } from './views/view-penalty/view-penalty/view-penalty.component';
import { ViewUnsettleBillComponent } from './views/view-unsettle-bill/view-unsettle-bill/view-unsettle-bill.component';
import { ViewEntryFormComponent } from './views/view-entry/view-entry-form/view-entry-form.component';
import { ViewRoomFormComponent } from './views/view-room/view-room-form/view-room-form.component';
import { ViewPenaltyFormComponent } from './views/view-penalty/view-penalty-form/view-penalty-form.component';
import { ViewUnsettleBillFormComponent } from './views/view-unsettle-bill/view-unsettle-bill-form/view-unsettle-bill-form.component';
import { PaymentHeaderComponent } from './components/payment/payment-header/payment-header.component';
import { SharedModule } from '@gmrc-admin/shared';
import { PaymentTableHeaderComponent } from './components/payment-table-header/payment-table-header.component';
import { ContainerPaymentComponent } from './containers/container-payment/container-payment/container-payment.component';
import { ContainerEntryComponent } from './containers/container-entry/container-entry/container-entry.component';
import { EntryTableComponent } from './components/entry/entry-table/entry-table.component';
import { SearchEntryComponent } from './modals/entry/search-entry/search-entry.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ContainerEntryFormComponent } from './containers/container-entry/container-entry-form/container-entry-form.component';
import { EntryFormComponent } from './components/entry/entry-form/entry-form.component';
import { ScrollingModule, ScrollDispatchModule } from '@angular/cdk/scrolling';
import { PaymentColorStatusDirective } from '@gmrc-admin/shared/directives';
import { ContainerRoomComponent } from './containers/container-room/container-room/container-room.component';
import { RoomPaymentTableComponent } from './components/room-payment/room-payment-table/room-payment-table.component';
import { RoomPaymentFormComponent } from './components/room-payment/room-payment-form/room-payment-form.component';
import { SearchRoomPaymentsComponent } from './modals/roomPayment/roomPayment/search-room-payments/search-room-payments.component';
import { ContainerRoomFormComponent } from './containers/container-room/container-room-form/container-room-form.component';
import { ViewRoomTenantsTableComponent } from './views/view-room/view-room-tenants-table/view-room-tenants-table.component';
import { RoomTenantsTableComponent } from './components/room-payment/room-tenants-table/room-tenants-table.component';
import { UpdateRoomTenantPaymentComponent } from './modals/roomPayment/roomPaymentForm/update-room-tenant-payment/update-room-tenant-payment/update-room-tenant-payment.component';
import { ContainerPenaltyComponent } from './containers/container-penalty/container-penalty/container-penalty.component';
import { ContainerPenaltyFormComponent } from './containers/container-penalty/container-penalty-form/container-penalty-form.component';
import { PenaltyTableComponent } from './components/penalty/penalty-table/penalty-table.component';
import { PenaltyFormComponent } from './components/penalty/penalty-form/penalty-form.component';
import { SearchPenaltyPaymentsComponent } from './modals/penalty/penalty/search-penalty-payments/search-penalty-payments.component';
import { ContainerUnsettleBillComponent } from './containers/container-unsettle-bill/container-unsettle-bill/container-unsettle-bill.component';
import { ContainerUnsettleBillFormComponent } from './containers/container-unsettle-bill/container-unsettle-bill-form/container-unsettle-bill-form.component';
import { UnsettleBillFormComponent } from './components/unsettle-bill/unsettle-bill-form/unsettle-bill-form.component';
import { SearchUnsettleBillComponent } from './modals/unsettleBill/unsettleBill/search-unsettle-bill/search-unsettle-bill.component';
import { UnSettleBillTableComponent } from './components/unsettle-bill/un-settle-bill-table/un-settle-bill-table.component';

@NgModule({
  declarations: [
    ViewPaymentComponent,
    ViewEntryComponent,
    ViewEntryFormComponent,
    ViewRoomComponent,
    ViewRoomFormComponent,
    ViewPenaltyComponent,
    ViewPenaltyFormComponent,
    ViewUnsettleBillComponent,
    ViewUnsettleBillFormComponent,
    ContainerPaymentComponent,
    PaymentHeaderComponent,
    PaymentTableHeaderComponent,
    ContainerEntryComponent,
    EntryTableComponent,
    SearchEntryComponent,
    ContainerEntryFormComponent,
    EntryFormComponent,
    ContainerRoomComponent,
    RoomPaymentTableComponent,
    RoomPaymentFormComponent,
    SearchRoomPaymentsComponent,
    ContainerRoomFormComponent,
    ViewRoomTenantsTableComponent,
    RoomTenantsTableComponent,
    UpdateRoomTenantPaymentComponent,
    ContainerPenaltyComponent,
    ContainerPenaltyFormComponent,
    PenaltyTableComponent,
    PenaltyFormComponent,
    SearchPenaltyPaymentsComponent,
    ContainerUnsettleBillComponent,
    ContainerUnsettleBillFormComponent,
    UnsettleBillFormComponent,
    SearchUnsettleBillComponent,
    UnSettleBillTableComponent,
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ScrollingModule,
    ScrollDispatchModule
  ],
  entryComponents: [
    SearchEntryComponent,
    SearchRoomPaymentsComponent,
    UpdateRoomTenantPaymentComponent,
    SearchPenaltyPaymentsComponent,
    SearchUnsettleBillComponent
  ]
})
export class PaymentModule { }
