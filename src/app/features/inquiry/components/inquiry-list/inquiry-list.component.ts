import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Inquiry } from '../../types/inquiry';
import { InquiryListStoreState } from '../../services/inquiry-list/inquiry-list.store.state';


@Component({
  selector: 'app-inquiry-list',
  templateUrl: './inquiry-list.component.html',
  styleUrls: ['./inquiry-list.component.scss']
})
export class InquiryListComponent implements OnInit {
  @Input() state$: InquiryListStoreState;
  @Input() displayedColumn: Array<string>;
  @Input() pageSizeOptions: Array<number>;
  @Input() totalCount: number;
  @Input() dataSource: MatTableDataSource<Inquiry>;
  constructor() { }

  ngOnInit() {
  }

}
