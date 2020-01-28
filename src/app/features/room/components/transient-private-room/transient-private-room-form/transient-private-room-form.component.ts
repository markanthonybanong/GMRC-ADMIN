import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RoomType } from '../../../room.enums';

@Component({
  selector: 'app-transient-private-room-form',
  templateUrl: './transient-private-room-form.component.html',
  styleUrls: ['./transient-private-room-form.component.scss']
})
export class TransientPrivateRoomFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() airconStatuses: Array<string>;
  @Input() roomStatuses: Array<string>;
  @Input() inProgress: boolean;
  @Input() floorNumbers: Array<number>;
  @Output() transientPrivateFormAddTenant: EventEmitter<null> = new EventEmitter<null>();
  @Output() transientPrivateFormBack: EventEmitter<null> = new EventEmitter<null>();
  @Output() transientPrivateFormOnSubmit: EventEmitter<null> = new EventEmitter<null>();
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
  onSubmit(): void {
    this.transientPrivateFormOnSubmit.emit();
  }


}
