import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Input() userTypes: Array<string>;
  @Input() loginForm: FormGroup;
  @Output() loginOnUserTypeChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }
  onUserTypeChange($event: MatSelectChange): void {
    this.loginOnUserTypeChange.emit($event.value);
  }

}
