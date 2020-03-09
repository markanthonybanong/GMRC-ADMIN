import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebcamUtil, WebcamImage, WebcamInitError } from 'ngx-webcam';

@Injectable({
  providedIn: 'root'
})
export class DataPhotoService {
  public multipleWebcamsAvailable: boolean;
  public isShowWebcam = false;
  public trigger: Subject<void> = new Subject<void>();
  public webcamImage: WebcamImage = null;
  public errors: WebcamInitError[] = [];
  constructor() { }
}
