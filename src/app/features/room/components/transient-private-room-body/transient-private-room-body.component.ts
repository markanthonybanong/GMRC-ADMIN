import { Component, OnInit, Input } from '@angular/core';
import { TransientPrivateRoomStoreState } from '../../services/transient-private-room/transient-private-room.store.state';
import { Observable } from 'rxjs';
import { Request } from '@gmrc-admin/shared/enums';

@Component({
  selector: 'app-transient-private-room-body',
  templateUrl: './transient-private-room-body.component.html',
  styleUrls: ['./transient-private-room-body.component.scss']
})
export class TransientPrivateRoomBodyComponent implements OnInit {
  @Input() displayedColumns: Array<string>;
  @Input() state$: Observable<TransientPrivateRoomStoreState>;
  @Input() request: Request;
  constructor() { }

  ngOnInit() {
  }

}
