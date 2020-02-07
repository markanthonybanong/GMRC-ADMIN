import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginStoreState } from '../../../services/login/login.store.state';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-container-login',
  templateUrl: './container-login.component.html',
  styleUrls: ['./container-login.component.scss']
})
export class ContainerLoginComponent implements OnInit {
  @Input() state$: Observable<LoginStoreState>;
  @Input() loginForm: FormGroup;
  @Input() userTypes: Array<string>;
  @Input() buttonName: string;
  @Input() adminPassword: string;
  @Output() containerLoginOnLogin: EventEmitter<object> = new EventEmitter<object>();
  @Output() containerLoginOnCreateAdminPassword: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerLoginOnUserTypeChange: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  onUserLogin(): void {
    this.containerLoginOnLogin.emit({
      type: this.loginForm.get('type').value,
      password: this.loginForm.get('password').value
    });
  }
  onCreateAdminPassword(): void {
    this.containerLoginOnCreateAdminPassword.emit();
  }
  onUserTypeChange(type: string): void {
    this.containerLoginOnUserTypeChange.emit(type);
  }

}
