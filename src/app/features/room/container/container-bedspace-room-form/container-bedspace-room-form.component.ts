import { Component, OnInit, Input } from '@angular/core';
import { BedspaceRoomFormStoreState } from '../../services/bedspace-room-form/bedspace-room-form.store.state';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-container-bedspace-room-form',
  templateUrl: './container-bedspace-room-form.component.html',
  styleUrls: ['./container-bedspace-room-form.component.scss']
})
export class ContainerBedspaceRoomFormComponent implements OnInit {
  @Input() state$: Observable<BedspaceRoomFormStoreState>;
  @Input() form: FormGroup;
  @Input() requestResponse: object;
  constructor() { }

  ngOnInit() {
  }

}
