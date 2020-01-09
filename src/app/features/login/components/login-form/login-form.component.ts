import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { LoginStoreState } from '../../services/login.store.state';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent{

  @Input() form: FormGroup;
  @Input() userTypes: Array<string>;
  @Input() buttonName: string;
  @Output() userType = new EventEmitter<string>();
  @Output() login = new EventEmitter();
  @Input() state$: LoginStoreState;
  @Output() createAdminPassword = new EventEmitter<FormGroup>();
  @Input() adminPassword: string;
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
