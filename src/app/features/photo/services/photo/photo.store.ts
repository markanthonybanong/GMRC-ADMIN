import { Injectable } from '@angular/core';
import { PhotoStoreState } from './photo.store.state';
import { Store } from 'rxjs-observable-store';
import { WebcamUtil, WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { DataPhotoService } from '@gmrc-admin/shared/services';

@Injectable()
export class PhotoStore extends Store<PhotoStoreState> {
  
    constructor(
        private dataPhotoService: DataPhotoService
    ) {
        super( new PhotoStoreState());
    }
    init(): void {
        WebcamUtil.getAvailableVideoInputs()
        .then((mediaDevices: MediaDeviceInfo[]) => {
          this.dataPhotoService.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
          this.dataPhotoService.isShowWebcam = true;
        })
        .catch( err => {
    
        });
    }
    get triggerObservable(): Observable<void> {
        return this.dataPhotoService.trigger.asObservable();
    }
    onHandleImage(webcamImage: WebcamImage): void {
        this.dataPhotoService.webcamImage = webcamImage;
    }
    onHandleInitError(error: WebcamInitError): void {
      this.dataPhotoService.errors.push(error);
    }
    onTriggerSnapshot(): void {
      this.dataPhotoService.trigger.next();
    }
}
