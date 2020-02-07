import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
@Component({
  selector: 'app-select-tenant-photo',
  templateUrl: './select-tenant-photo.component.html',
  styleUrls: ['./select-tenant-photo.component.scss']
})
export class SelectTenantPhotoComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  form = this.formBuilder.group({
    tenantImage : [null, Validators.required]
  });
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.form.get('tenantImage').setValue(event.base64);
    this.croppedImage = event.base64;
  }
}
