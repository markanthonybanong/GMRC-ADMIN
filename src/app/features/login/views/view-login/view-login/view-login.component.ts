import { Component, OnInit } from '@angular/core';
import { LoginStore } from '../../../services/login/login.store';
import { LoginEndpoint } from '../../../services/login/login.endpoint';
import { DataLoginService } from '@gmrc-admin/shared/services';

@Component({
  selector: 'app-view-login',
  templateUrl: './view-login.component.html',
  styleUrls: ['./view-login.component.scss'],
  providers: [LoginStore, LoginEndpoint]
})
export class ViewLoginComponent implements OnInit {

  constructor(
    private store: LoginStore,
    private dataLoginService: DataLoginService
  ) { }

  ngOnInit() {
    this.store.init();
  }


}
