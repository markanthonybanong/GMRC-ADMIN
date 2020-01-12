import { Component, OnInit } from '@angular/core';
import { enumsToArray } from '@gmrc-admin/shared/helpers';
import { UserType } from '../../login.enums';
import { FormStore } from '../../services/form.store';
import { FormEndpoint } from '../../services/form.endpoint';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.scss'],
  providers: [FormStore, FormEndpoint]
})
export class ViewFormComponent implements OnInit {

  constructor(
    private store: FormStore
  ) { }

  ngOnInit() {
    this.store.init();
  }
  get userTypes(): Array<string> {
    return enumsToArray(UserType);
  }

}
