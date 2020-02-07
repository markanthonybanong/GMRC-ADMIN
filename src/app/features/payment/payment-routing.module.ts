import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewPaymentComponent } from './views/view-payment/view-payment/view-payment.component';
import { ViewEntryComponent } from './views/view-entry/view-entry/view-entry.component';
import { ViewRoomComponent } from './views/view-room/view-room/view-room.component';
import { ViewPenaltyComponent } from './views/view-penalty/view-penalty/view-penalty.component';
import { ViewEntryFormComponent } from './views/view-entry/view-entry-form/view-entry-form.component';
import { ViewPenaltyFormComponent } from './views/view-penalty/view-penalty-form/view-penalty-form.component';
import { ViewRoomFormComponent } from './views/view-room/view-room-form/view-room-form.component';
import { ViewUnsettleBillComponent } from './views/view-unsettle-bill/view-unsettle-bill/view-unsettle-bill.component';
import { ViewUnsettleBillFormComponent } from './views/view-unsettle-bill/view-unsettle-bill-form/view-unsettle-bill-form.component';


const routes: Routes = [
  {
    path: '',
    component: ViewPaymentComponent,
    children: [
      { path: '', redirectTo: 'entry', pathMatch: 'full' },
      { path: 'entry', component: ViewEntryComponent },
      { path: 'room', component: ViewRoomComponent },
      { path: 'penalty', component: ViewPenaltyComponent },
      { path: 'unsettle-bill', component: ViewUnsettleBillComponent},
    ]
  },
  { path: 'add-entry', component: ViewEntryFormComponent },
  { path: 'update-entry/:id', component: ViewEntryFormComponent },
  { path: 'add-room-payment', component: ViewRoomFormComponent },
  { path: 'update-room-payment/:id', component: ViewRoomFormComponent },
  { path: 'add-penalty', component: ViewPenaltyFormComponent },
  { path: 'update-penalty/:id', component: ViewPenaltyFormComponent },
  { path: 'add-unsettle-bill', component: ViewUnsettleBillFormComponent },
  { path: 'update-unsettle-bill/:id', component: ViewUnsettleBillFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
