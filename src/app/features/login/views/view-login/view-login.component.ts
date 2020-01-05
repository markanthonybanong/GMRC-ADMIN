import { Component, OnInit } from '@angular/core';
import { LoginStore } from '../../services/login-store';
import { enumsToArray } from '@gmrc-admin/shared/helpers';
import { UserType } from '../../login.constants';
import { LoginEndPoint } from '../../services/login-end-point';
@Component({
  selector: 'app-view-login',
  templateUrl: './view-login.component.html',
  styleUrls: ['./view-login.component.scss'],
  providers: [LoginStore, LoginEndPoint]
})
export class ViewLoginComponent implements OnInit {

  constructor(
    private store: LoginStore
  ) { }

  ngOnInit() {
    this.store.init();
  }
  get userTypes(): Array<string> {
    return enumsToArray(UserType);
  }

}
