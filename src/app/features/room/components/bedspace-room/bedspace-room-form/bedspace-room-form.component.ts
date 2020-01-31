import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bedspace-room-form',
  templateUrl: './bedspace-room-form.component.html',
  styleUrls: ['./bedspace-room-form.component.scss']
})
export class BedspaceRoomFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() inProgress: boolean;
  @Input() roomNumbers: Array<number>;
  @Input() floorNumbers: Array<number>;
  @Input() airconStatuses: Array<string>;
  @Input() bedsFormArrayLength: number;
  @Output() roomOnBack: EventEmitter<null> = new EventEmitter<null>();
  @Output() roomOnSubmit: EventEmitter<null> = new EventEmitter<null>();
  @Output() roomOnAddBed: EventEmitter<null> = new EventEmitter<null>();

  constructor() { }

  ngOnInit() {
  }
  onBack(): void {
    this.roomOnBack.emit();
  }
  onSubmit(): void {
    this.roomOnSubmit.emit();
  }
  onAddBed(): void {
    this.roomOnAddBed.emit();
  }
}
