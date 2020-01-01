import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserType} from '../../login.constants';
import { MatSelectChange } from '@angular/material';
import { Credential } from '../../types/credential';
import { LoginStoreState } from '../../services/login-store-state';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent{

  form = this.formBuilder.group({
    userType: [UserType.SuperAdmin, Validators.required],
    password: [null, Validators.required]
  });
  @Input() userTypes: Array<string>;
  @Input() buttonName: string;
  @Output() userType = new EventEmitter<string>();
  @Output() login = new EventEmitter<Credential>();
  @Input() state: LoginStoreState;
  constructor(
    private formBuilder: FormBuilder
  ) { }
  userTypeChange($event: MatSelectChange): void {
    this.userType.emit($event.value);
  }
  onUserLogin(): void {
    this.login.emit({
      userType: this.form.get('userType').value,
      password: this.form.get('password').value
    });
  }
}
