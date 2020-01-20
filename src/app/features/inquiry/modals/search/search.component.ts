import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataRoomService } from '@gmrc-admin/shared/services';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  form = this.formBuilder.group({
    roomType: null,
    roomNumber: null,
    willOccupyIn: null,
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dataRoomService: DataRoomService
  ) { }

  ngOnInit() {
    this.dataRoomService.init();
  }

}
