import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
 
import { WebcamImage, WebcamInitError} from 'ngx-webcam';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  @Input() isShowWebcam: boolean;
  @Input() triggerObservable: Observable<void>;
  @Input() webcamImage: WebcamImage;
  @Output() photoOnHandleImage: EventEmitter<WebcamImage> = new EventEmitter<WebcamImage>();
  @Output() photoOnHandleInitError: EventEmitter<WebcamInitError> = new EventEmitter<WebcamInitError>();
  @Output() photoOnTriggerSnapshot: EventEmitter<null> = new EventEmitter<null>();
  constructor() { }

  ngOnInit() {
  }
  onHandleImage($event: WebcamImage): void {
    this.photoOnHandleImage.emit($event);
  }
  onHandleInitError($event: WebcamInitError): void {
    this.photoOnHandleInitError.emit($event);
  }
  onTriggerSnapshot(): void {
    this.photoOnTriggerSnapshot.emit();
  }

}
