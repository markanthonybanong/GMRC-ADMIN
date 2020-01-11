import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { LoginStoreState } from '../../services/login.store.state';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent{

  @Input() form: FormGroup;
  @Input() userTypes: Array<string>;
  @Input() buttonName: string;
  @Input() state$: LoginStoreState;
  @Input() adminPassword: string;
  @Output() userType: EventEmitter<string> = new EventEmitter<string>();
  @Output() login: EventEmitter<object> = new EventEmitter<object>();
  @Output() createAdminPassword: EventEmitter<null> = new EventEmitter<null>();

  constructor() { }
  userTypeChange($event: MatSelectChange): void {
    this.userType.emit($event.value);
  }
  onUserLogin(): void {
    this.login.emit({
      type: this.form.get('type').value,
      password: this.form.get('password').value
    });
  }
  onCreateAdminPassword(): void {
    this.createAdminPassword.emit();
  }
}
