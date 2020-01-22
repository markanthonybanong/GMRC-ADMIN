import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { RoomType } from '@gmrc-admin/shared/enums';


@Component({
  selector: 'app-transient-private-room-form',
  templateUrl: './transient-private-room-form.component.html',
  styleUrls: ['./transient-private-room-form.component.scss']
})
export class TransientPrivateRoomFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() airconStatuses: Array<string>;
  @Input() roomStatuses: Array<string>;
  @Output() transientPrivateFormAddTenant: EventEmitter<null> = new EventEmitter<null>();
  @Output() transientPrivateFormBack: EventEmitter<null> = new EventEmitter<null>();
  public roomTypes: Array<string> = [RoomType.PRIVATE, RoomType.TRANSIENT];
  constructor() { }

  ngOnInit() {
  }

  onAddTenant(): void {
    this.transientPrivateFormAddTenant.emit();
  }
  onBack(): void {
    this.transientPrivateFormBack.emit();
  }


}
