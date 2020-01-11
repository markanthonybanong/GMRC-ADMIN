import { Component, OnInit } from '@angular/core';
import { enumsToArray } from '@gmrc-admin/shared/helpers';
import { UserType } from '../../login.enums';
import { LoginStore } from '../../services/login.store';
import { LoginEndPoint } from '../../services/login.endpoint';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.scss'],
  providers: [LoginStore, LoginEndPoint]
})
export class ViewFormComponent implements OnInit {

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
