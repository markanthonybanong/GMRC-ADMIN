import { Component, OnInit } from '@angular/core';
import { PhotoStore } from '../../../services/photo/photo.store';
import { PhotoEndpoint } from '../../../services/photo/photo.endpoint';
import { DataPhotoService } from '@gmrc-admin/shared/services';

@Component({
  selector: 'app-view-photo',
  templateUrl: './view-photo.component.html',
  styleUrls: ['./view-photo.component.scss'],
  providers: [PhotoStore, PhotoEndpoint]
})
export class ViewPhotoComponent implements OnInit {

  constructor(
    private store: PhotoStore,
    private dataPhotoService: DataPhotoService
  ) { }

  ngOnInit() {
    this.store.init();
  }

}
