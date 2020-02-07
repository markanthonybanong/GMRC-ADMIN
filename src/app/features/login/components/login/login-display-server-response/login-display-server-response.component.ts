import { Component, OnInit, Input } from '@angular/core';
import { LoginStoreState } from '../../../services/login/login.store.state';

@Component({
  selector: 'app-login-display-server-response',
  templateUrl: './login-display-server-response.component.html',
  styleUrls: ['./login-display-server-response.component.scss']
})
export class LoginDisplayServerResponseComponent implements OnInit {
  @Input() state: LoginStoreState;
  @Input() adminPassword: string;

  constructor() { }

  ngOnInit() {
  }

}
