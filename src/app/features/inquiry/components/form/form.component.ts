import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormStoreState } from '../../services/form/form.store.state';
import { FormGroup, FormArray } from '@angular/forms';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() state$: FormStoreState;
  @Input() title: string;
  @Input() form: FormGroup;
  @Input() knownGMRCThrough: Array<string>;
  @Input() genders: Array<string>;
  @Input() roomTypes: Array<string>;
  @Input() bedInfos: FormArray;
  @Input() buttonName: string;
  @Output() formRoomChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() formBack: EventEmitter<null> = new EventEmitter<null>();
  @Output() formSubmit: EventEmitter<object> = new EventEmitter<object>();

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
    this.formSubmit.emit(this.form.value);
  }
}
