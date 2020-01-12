import { Component, OnInit } from '@angular/core';
import { ListStore } from '../../services/list/list.store';
import { ListEndpoint } from '../../services/list/list.endpoint';
import { Request} from '@gmrc-admin/shared/enums';
@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss'],
  providers: [ListStore, ListEndpoint]
})
export class ViewListComponent implements OnInit {

  constructor(private store: ListStore) {
    this.store.init();
  }

  ngOnInit() {
  }
  get request(): object {
    return Request;
  }

}
