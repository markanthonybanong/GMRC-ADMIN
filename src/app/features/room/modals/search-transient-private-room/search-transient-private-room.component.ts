import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataRoomService } from '@gmrc-admin/shared/services';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-search-transient-private-room',
  templateUrl: './search-transient-private-room.component.html',
  styleUrls: ['./search-transient-private-room.component.scss']
})
export class SearchTransientPrivateRoomComponent implements OnInit {
  form = this.formBuilder.group({
    number: null,
    floor: null,
    type: null,
    status: null,
    aircon: null,
    dueRent: null,
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dataRoomService: DataRoomService
  ) { }

  ngOnInit() {

  }

}
