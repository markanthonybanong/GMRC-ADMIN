import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { Observable } from 'rxjs';
import { RoomFormStoreState } from '../../services/room-form/room-form.store.state';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss']
})
export class RoomFormComponent implements OnInit {
  @Input() state$: Observable<RoomFormStoreState>;
  @Input() form: FormGroup;
  @Input() roomTypes: Array<string>;
  @Input() airconStatuses: Array<string>;
  @Input() roomStatuses: Array<string>;
  @Output() roomRoomType: EventEmitter<string> = new EventEmitter<string>();
  @Output() roomBack: EventEmitter<null> = new EventEmitter<null>();
  @Output() roomSubmit: EventEmitter<object> = new EventEmitter<object>();
  constructor() { }

  ngOnInit() {
  }
  onRoomTypeChange($event: MatSelect): void {
    this.roomRoomType.emit($event.value);
  }
  onBack(): void {
    this.roomBack.emit();
  }
  onSubmit(): void {
    this.roomSubmit.emit(this.form.value);
  }

}
