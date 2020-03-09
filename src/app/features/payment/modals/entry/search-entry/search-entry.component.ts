import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataRoomService, DataPaymentService, DataTenantService } from '@gmrc-admin/shared/services';

@Component({
  selector: 'app-search-entry',
  templateUrl: './search-entry.component.html',
  styleUrls: ['./search-entry.component.scss']
})
export class SearchEntryComponent implements OnInit {
  public entrySearchForm = this.formBuilder.group({
    roomNumber: null,
    tenantName: null,
    oneMonthDeposit: null,
    oneMonthAdvance: null,
    dateEntry: null,
    dateExit: null,
    tenant: null,
  });
  constructor(
    private formBuilder: FormBuilder,
    private dataRoomService: DataRoomService,
    private dataPaymentService: DataPaymentService,
    private dataTenantService: DataTenantService
  ) { }

  ngOnInit() {
    this.dataRoomService.setRooms
  }
  setTenantObjectId(tenantObjId: string): void {
    this.entrySearchForm.get('tenant').patchValue(tenantObjId)
  }

}
