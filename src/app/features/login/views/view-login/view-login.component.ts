import { Component, OnInit } from '@angular/core';
import { LoginStore } from '../../services/login-store';
import { enumsToArray } from '@gmrc-admin/shared/helpers';
import { UserType } from '../../login.constants';
@Component({
  selector: 'app-view-login',
  templateUrl: './view-login.component.html',
  styleUrls: ['./view-login.component.scss'],
  providers: [LoginStore]
})
export class ViewLoginComponent implements OnInit {

  constructor(
    private store: LoginStore
  ) { }

  ngOnInit() {
  }
  get userTypes(): Array<string> {
    return enumsToArray(UserType);
  }

}
