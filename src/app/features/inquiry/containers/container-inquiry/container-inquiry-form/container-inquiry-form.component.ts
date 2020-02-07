import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { InquiryFormStoreState } from '../../../services/inquiry/inquiry-form/inquiry-form.store.state';
import { RequestResponse } from '@gmrc-admin/shared/enums';
import { FormGroup } from '@angular/forms';
import { getRoomNumbers } from '@gmrc-admin/shared/helpers';
import { MatSelectChange } from '@angular/material/select/index';

@Component({
  selector: 'app-container-inquiry-form',
  templateUrl: './container-inquiry-form.component.html',
  styleUrls: ['./container-inquiry-form.component.scss']
})
export class ContainerInquiryFormComponent implements OnInit {
  @Input() state$: Observable<InquiryFormStoreState>;
  @Input() requestResponse: RequestResponse;
  @Input() inquiryForm: FormGroup;
  @Input() knownGMRCThrough: Array<string>;
  @Input() genders: Array<string>;
  @Input() roomTypes: Array<string>;
  @Input() roomNumbers: Array<number>;
  @Output() containerInquiryFormOnRoomChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() containerInquiryFormOnBack: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerInquiryFormOnSubmit: EventEmitter<null> = new EventEmitter<null>();
  constructor() { }

  ngOnInit() {
  }
  onRoomChange($event: MatSelectChange): void {
    this.containerInquiryFormOnRoomChange.emit($event.value);
  }
  onBack(): void {
    this.containerInquiryFormOnBack.emit();
  }
  onSubmit(): void {
    this.containerInquiryFormOnSubmit.emit();
  }

}
