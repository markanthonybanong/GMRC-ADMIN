import { Component, OnInit } from '@angular/core';
import { enumsToArray } from '@gmrc-admin/shared/helpers';
import { UserType } from '../../login.enums';
import { LoginStore } from '../../services/login.store';
import { LoginEndpoint } from '../../services/login.endpoint';

@Component({
  selector: 'app-view-login',
  templateUrl: './view-login.component.html',
  styleUrls: ['./view-login.component.scss'],
  providers: [LoginStore, LoginEndpoint]
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
