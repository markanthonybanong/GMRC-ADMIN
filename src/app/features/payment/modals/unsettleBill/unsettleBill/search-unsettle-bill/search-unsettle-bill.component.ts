import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataRoomService, DataTenantService } from '@gmrc-admin/shared/services';

@Component({
  selector: 'app-search-unsettle-bill',
  templateUrl: './search-unsettle-bill.component.html',
  styleUrls: ['./search-unsettle-bill.component.scss']
})
export class SearchUnsettleBillComponent implements OnInit {
  public unsettleBillSearchForm = this.formBuilder.group({
    roomType: null,
    roomNumber: null,
    tenantName: null,
    tenantObjectId: null,
  });
  constructor(
    private formBuilder: FormBuilder,
    private dataRoomService: DataRoomService,
    private dataTenantService: DataTenantService
  ) { }

  ngOnInit() {
  }
  onSetTenantObjectId(tenantObjId: string): void {
    this.unsettleBillSearchForm.get('tenantObjectId').patchValue(tenantObjId)
  }

}
