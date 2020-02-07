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
    ViewUnsettleBillFormComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }
