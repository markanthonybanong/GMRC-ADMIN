import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoRoutingModule } from './photo-routing.module';
import { ViewPhotoComponent } from './views/view-photo/view-photo/view-photo.component';
import { PhotoComponent } from './components/photo/photo/photo.component';
import { SharedModule } from '@gmrc-admin/shared';
import {WebcamModule} from 'ngx-webcam';


@NgModule({
  declarations: [ViewPhotoComponent, PhotoComponent],
  imports: [
    CommonModule,
    PhotoRoutingModule,
    SharedModule,
    WebcamModule
  ]
})
export class PhotoModule { }
