import { Component, OnInit, Input } from '@angular/core';
import { RequestState } from '@gmrc-admin/shared/types';
import { RequestResponse } from '@gmrc-admin/shared/enums';

@Component({
  selector: 'app-in-progress-error',
  templateUrl: './in-progress-error.component.html',
  styleUrls: ['./in-progress-error.component.scss']
})
export class InProgressErrorComponent implements OnInit {
  @Input() request: RequestState;
  @Input() requestResponse: RequestResponse;
  constructor() { }

  ngOnInit() {
  }

}
