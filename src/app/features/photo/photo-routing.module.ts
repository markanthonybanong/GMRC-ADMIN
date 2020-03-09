import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewPhotoComponent } from './views/view-photo/view-photo/view-photo.component';


const routes: Routes = [
  { path: '', component: ViewPhotoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotoRoutingModule { }
