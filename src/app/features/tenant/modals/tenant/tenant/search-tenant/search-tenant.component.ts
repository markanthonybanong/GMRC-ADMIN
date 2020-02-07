import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataRoomService, DataTenantService } from '@gmrc-admin/shared/services';
import { tap } from 'rxjs/operators';
import { getRoomNumbers } from '@gmrc-admin/shared/helpers';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search-tenant.component.html',
  styleUrls: ['./search-tenant.component.scss']
})
export class SearchTenantComponent implements OnInit {
  public roomNumbers: Array<number>;
  public form = this.formBuilder.group({
    roomNumber: null,
    gender: null,
    typeOfNetwork: null,
    dueRentDate: null,
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dataRoomService: DataRoomService,
    private dataTenantService: DataTenantService
  ) { }

  ngOnInit() {
    this.setRoomNumbers();
  }
  private setRoomNumbers(): void {
    this.dataRoomService.getAllRooms
      .pipe(
        tap((pageData) => this.roomNumbers = getRoomNumbers(pageData.data)),
      ).subscribe();
  }

}
