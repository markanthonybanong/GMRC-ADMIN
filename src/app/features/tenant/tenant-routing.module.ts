import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTenantComponent } from './views/view-tenant/view-tenant/view-tenant.component';
import { ViewTenantFormComponent } from './views/view-tenant/view-tenant-form/view-tenant-form.component';


const routes: Routes = [
  { path: '', component: ViewTenantComponent },
  { path: 'add', component: ViewTenantFormComponent },
  { path: 'update/:id', component: ViewTenantFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
