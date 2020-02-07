import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { RequestResponse } from '@gmrc-admin/shared/enums';
import { InquiryFormStoreState } from '../../../services/inquiry/inquiry-form/inquiry-form.store.state';

@Component({
  selector: 'app-inquiry-form',
  templateUrl: './inquiry-form.component.html',
  styleUrls: ['./inquiry-form.component.scss']
})
export class InquiryFormComponent implements OnInit {
  @Input() state: InquiryFormStoreState;
  @Input() inquiryForm: FormGroup;
  @Input() knownGMRCThrough: Array<string>;
  @Input() genders: Array<string>;
  @Input() roomTypes: Array<string>;
  @Input() requestResponse: RequestResponse;
  @Input() roomNumbers: Array<number>;
  @Output() formRoomChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() formBack: EventEmitter<null> = new EventEmitter<null>();
  @Output() formSubmit: EventEmitter<null> = new EventEmitter<null>();

  constructor() { }

  ngOnInit() {
  }
  onRoomChange($event: MatSelectChange): void {
    this.formRoomChange.emit($event.value);
  }
  onBack(): void {
    this.formBack.emit();
  }
  onSubmit(): void {
    this.formSubmit.emit();
  }
}
