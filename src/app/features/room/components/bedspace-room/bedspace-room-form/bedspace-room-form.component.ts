import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bedspace-room-form',
  templateUrl: './bedspace-room-form.component.html',
  styleUrls: ['./bedspace-room-form.component.scss']
})
export class BedspaceRoomFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() inProgress: boolean;
  constructor() { }

  ngOnInit() {
  }

}
