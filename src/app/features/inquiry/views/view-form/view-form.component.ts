import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormStore } from '../../services/form/form.store';
import { FormEndpoint } from '../../services/form/form.endpoint';
import { Request } from '@gmrc-admin/shared/enums';

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
  get request(): object {
    return Request;
  }

}
