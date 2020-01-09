import { Component, OnInit, Input } from '@angular/core';
import { InquiryListStoreState } from '../../services/inquiry-list/inquiry-list.store.state';

@Component({
  selector: 'app-inquiry-list-body',
  templateUrl: './inquiry-list-body.component.html',
  styleUrls: ['./inquiry-list-body.component.scss']
})
export class InquiryListBodyComponent implements OnInit {
  @Input() state$: InquiryListStoreState;
  @Input() displayedColumns: Array<string>;
  @Input() pageSizeOptions: Array<number>;
  @Input() totalCount: number;

  constructor() { }

  ngOnInit() {
  }

}
